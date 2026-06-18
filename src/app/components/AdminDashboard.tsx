import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, RefreshCw, Database, ChefHat, X, Save, Loader2, ImageIcon, Upload, Trash, ExternalLink, Calculator } from 'lucide-react';
import { authedPost, authedFetch } from '../utils/apiClient';
import { useConfirm } from '../hooks/useConfirm';
import { ImageStorageInfo } from './ImageStorageInfo';

const LOCAL_IMAGE_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiMxNDJBMUQiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjMUU0MDI5Ii8+PHJlY3QgeD0iNzIiIHk9IjE2MiIgd2lkdGg9IjE3NiIgaGVpZ2h0PSIxMiIgcng9IjYiIGZpbGw9IiMyMkM1NUUiIG9wYWNpdHk9IjAuNzUiLz48L3N2Zz4=';

interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  category: string;
  cookingTime: number;
  servings: number;
  difficulty: string;
  ingredients: any[];
  instructions: string[];
  nutrition: any;
  tags: string[];
  benefits: string[];
  meal_type: string;
  recipe_category: string;
  imageUrl?: string;
  sourceUrl?: string;
  image?: { url: string; alt: string };
  rating?: number;
  review_count?: number;
}

export function AdminDashboard() {
  const confirm = useConfirm();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedRecipeKey, setSelectedRecipeKey] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: '',
    name: '',
    description: '',
    cuisine: 'american',
    category: 'dinner',
    cookingTime: 30,
    servings: 2,
    difficulty: 'easy',
    ingredients: [],
    instructions: [],
    nutrition: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 },
    tags: [],
    benefits: [],
    meal_type: 'work',
    recipe_category: 'Dinner',
    sourceUrl: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newRecipeImageFile, setNewRecipeImageFile] = useState<File | null>(null);
  const [newRecipeImagePreview, setNewRecipeImagePreview] = useState<string | null>(null);
  const [aiImageLoadError, setAiImageLoadError] = useState(false);
  const [newRecipeAiImageLoadError, setNewRecipeAiImageLoadError] = useState(false);
  const [calculatingNutrition, setCalculatingNutrition] = useState(false);
  const [nutritionDetails, setNutritionDetails] = useState<any[] | null>(null);
  const [estimatingCosts, setEstimatingCosts] = useState(false);


  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const fetchAllRecipes = async () => {
    setLoading(true);
    try {
      const response = await authedFetch('admin/all-recipes', { method: 'GET' });
      const data = await response.json();

      // Check for errors in response
      if (data.error) {
        console.error('Error from server:', data.error);
        showMessage('error', `Failed to fetch recipes: ${data.error}`);
        setRecipes([]);
        return;
      }

      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      showMessage('error', 'Failed to fetch recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const initializeRecipes = async () => {
    if (!(await confirm({ title: 'Re-initialize recipe database?', description: 'This clears all existing recipes and re-initializes the full database (breakfast, lunch & dinner).', confirmText: 'Continue', destructive: true }))) {
      return;
    }

    setLoading(true);
    try {
      const data = await authedPost<any>('init-recipes');

      if (data.error) {
        showMessage('error', `Failed to initialize recipes: ${data.error}`);
        return;
      }

      const byType = data.byMealType || {};
      const byCat = data.byCategory || {};
      showMessage('success', `Recipes initialized! ${data.totalRecipes} recipes (Work: ${byType.work || 0}, Fitness: ${byType.fitness || 0}, Study: ${byType.study || 0}) — Breakfast: ${byCat.Breakfast || 0}, Lunch: ${byCat.Lunch || 0}, Dinner: ${byCat.Dinner || 0}. Errors: ${data.errorCount || 0}`);
      await fetchAllRecipes();
    } catch (error: any) {
      console.error('Error initializing recipes:', error);
      showMessage('error', `Failed to initialize recipes: ${error.message || 'Network error'}`);
    } finally {
      setLoading(false);
    }
  };

  const viewRecipe = async (recipeKey: string) => {
    try {
      // Key format: "recipe:{mealType}:{id}"
      const parts = recipeKey.split(':');
      const mealType = parts[1];
      const recipeId = parts[2];

      const response = await authedFetch(`admin/recipe/${mealType}/${recipeId}`);
      const data = await response.json();
      setSelectedRecipe(data.recipe);
      setSelectedRecipeKey(recipeKey);
      setEditedRecipe(data.recipe);
      setEditMode(false);
      setImageFile(null);
      setImagePreview(null);
      setAiImageLoadError(false);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      showMessage('error', 'Failed to fetch recipe details');
    }
  };

  const saveRecipe = async () => {
    if (!editedRecipe) return;

    setLoading(true);
    try {
      await authedPost('admin/recipe', editedRecipe);
      showMessage('success', 'Recipe saved successfully!');
      setEditMode(false);
      setSelectedRecipe(editedRecipe);
      setImageFile(null);
      setImagePreview(null);
      await fetchAllRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
      showMessage('error', 'Failed to save recipe');
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (recipeKey: string) => {
    if (!(await confirm({ title: 'Delete recipe?', description: 'This permanently removes the recipe.', confirmText: 'Delete', destructive: true }))) return;

    setLoading(true);
    try {
      // Key format: "recipe:{mealType}:{id}"
      const parts = recipeKey.split(':');
      const mealType = parts[1];
      const recipeId = parts[2];

      await authedFetch(`admin/recipe/${mealType}/${recipeId}`, { method: 'DELETE' });
      showMessage('success', 'Recipe deleted successfully!');
      setSelectedRecipe(null);
      setSelectedRecipeKey(null);
      await fetchAllRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      showMessage('error', 'Failed to delete recipe');
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async () => {
    if (!searchQuery || searchQuery.length < 2) {
      await fetchAllRecipes();
      return;
    }

    setLoading(true);
    try {
      const data = await authedPost<any>('admin/search-recipes', { query: searchQuery });

      // Check if there's an error in the response
      if (data.error) {
        console.error('Search error from server:', data.error);
        showMessage('error', `Search failed: ${data.error}`);
        setRecipes([]);
        return;
      }

      // Check if recipes array exists
      if (!data.recipes || !Array.isArray(data.recipes)) {
        console.error('Invalid response format:', data);
        showMessage('error', 'Invalid search results');
        setRecipes([]);
        return;
      }
      
      // Transform search results to match recipe list format
      const transformedRecipes = data.recipes.map((recipe: any) => ({
        key: `recipe:${recipe.meal_type || 'work'}:${recipe.id}`,
        id: recipe.id,
        name: recipe.name,
        meal_type: recipe.meal_type,
        recipe_category: recipe.recipe_category,
        category: recipe.category,
        cookingTime: recipe.cookingTime || recipe.total_time_minutes || 0,
        rating: recipe.rating,
      }));
      
      setRecipes(transformedRecipes);
    } catch (error) {
      console.error('Error searching recipes:', error);
      showMessage('error', 'Search failed');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // Price unpriced recipes via Gemini, a resumable chunk per click (the backend
  // defaults to ~60 recipes/run). Re-run until `remaining` reaches 0.
  const estimateRecipeCosts = async () => {
    if (!(await confirm({
      title: 'Estimate recipe costs?',
      description: 'Prices recipes that have no cost yet, using Gemini. Runs a chunk per click — re-run until none remain.',
      confirmText: 'Run',
    }))) {
      return;
    }

    setEstimatingCosts(true);
    showMessage('success', 'Estimating recipe costs…');
    try {
      const data = await authedPost<any>('admin/estimate-recipe-costs', {});
      if (data.error) {
        showMessage('error', `Cost estimation failed: ${data.error}`);
        return;
      }
      showMessage(
        'success',
        `Priced ${data.priced} recipes${data.failed ? `, ${data.failed} failed` : ''}. ${data.remaining} remaining${data.remaining ? ' — run again to continue.' : ' ✓'}`,
      );
      await fetchAllRecipes();
    } catch (error) {
      console.error('Error estimating recipe costs:', error);
      showMessage('error', 'Failed to estimate recipe costs');
    } finally {
      setEstimatingCosts(false);
    }
  };

  // Handle image file selection
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showMessage('error', 'Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', 'Image size must be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload custom image for a recipe
  const handleUploadCustomImage = async () => {
    if (!imageFile || !editedRecipe) return;
    
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('recipeId', editedRecipe.id);
      formData.append('cuisine', editedRecipe.cuisine);

      // FormData upload: authedFetch sends the session JWT and does NOT set
      // Content-Type, so the browser supplies the multipart boundary.
      const response = await authedFetch('upload-recipe-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        showMessage('error', `Upload failed: ${data.error}`);
        return;
      }
      
      // Update the edited recipe with the new image URL
      setEditedRecipe({ ...editedRecipe, imageUrl: data.imageUrl });
      showMessage('success', 'Image uploaded successfully!');
      
      // Clear the file input
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      showMessage('error', 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Clear selected image
  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle new recipe image file selection
  const handleNewRecipeImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showMessage('error', 'Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', 'Image size must be less than 5MB');
        return;
      }
      
      setNewRecipeImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRecipeImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear new recipe image
  const handleClearNewRecipeImage = () => {
    setNewRecipeImageFile(null);
    setNewRecipeImagePreview(null);
  };

  const getMealTypeEmoji = (mealType: string) => {
    const emojiMap: Record<string, string> = {
      work: '💼',
      fitness: '💪',
      study: '🧠',
    };
    return emojiMap[mealType] || '🍽️';
  };

  const getMealTypeColor = (mealType: string) => {
    const colorMap: Record<string, string> = {
      'work': 'bg-blue-100 text-blue-700 border-blue-300',
      'fitness': 'bg-green-100 text-green-700 border-green-300',
      'study': 'bg-amber-100 text-amber-700 border-amber-300',
    };
    return colorMap[mealType] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const createNewRecipe = async () => {
    if (!newRecipe.id || !newRecipe.name || !newRecipe.meal_type) {
      showMessage('error', 'Please fill in all required fields (ID, Name, Meal Type)');
      return;
    }

    setLoading(true);
    try {
      // First, upload the custom image if provided
      let imageUrl = null;
      if (newRecipeImageFile) {
        const formData = new FormData();
        formData.append('image', newRecipeImageFile);
        formData.append('recipeId', newRecipe.id);
        formData.append('cuisine', newRecipe.cuisine);

        // FormData upload: authedFetch sends the session JWT and does NOT set
        // Content-Type, so the browser supplies the multipart boundary.
        const uploadResponse = await authedFetch('upload-recipe-image', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.imageUrl) {
          imageUrl = uploadData.imageUrl;
        }
      }
      
      // Create the recipe with the uploaded image URL
      const recipeWithImage = imageUrl ? { ...newRecipe, imageUrl } : newRecipe;

      const data = await authedPost<any>('admin/recipe', recipeWithImage);

      if (data.error) {
        showMessage('error', `Failed to create recipe: ${data.error}`);
        return;
      }

      showMessage('success', 'Recipe created successfully!');
      setShowAddRecipe(false);
      // Reset form
      setNewRecipe({
        id: '',
        name: '',
        description: '',
        cuisine: 'american',
        category: 'dinner',
        cookingTime: 30,
        servings: 2,
        difficulty: 'easy',
        ingredients: [],
        instructions: [],
        nutrition: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 },
        tags: [],
        benefits: [],
        meal_type: 'work',
        recipe_category: 'Dinner',
        sourceUrl: ''
      });
      setNewRecipeImageFile(null);
      setNewRecipeImagePreview(null);
      await fetchAllRecipes();
    } catch (error) {
      console.error('Error creating recipe:', error);
      showMessage('error', 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = (isNew: boolean = false) => {
    const newIng = { name: '', amount: '', estimatedPrice: 0 };
    if (isNew) {
      setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, newIng] });
    } else {
      setEditedRecipe({ ...editedRecipe!, ingredients: [...(editedRecipe?.ingredients || []), newIng] });
    }
  };

  const removeIngredient = (index: number, isNew: boolean = false) => {
    if (isNew) {
      const updated = [...newRecipe.ingredients];
      updated.splice(index, 1);
      setNewRecipe({ ...newRecipe, ingredients: updated });
    } else {
      const updated = [...(editedRecipe?.ingredients || [])];
      updated.splice(index, 1);
      setEditedRecipe({ ...editedRecipe!, ingredients: updated });
    }
  };

  const updateIngredient = (index: number, field: string, value: any, isNew: boolean = false) => {
    if (isNew) {
      const updated = [...newRecipe.ingredients];
      updated[index] = { ...updated[index], [field]: value };
      setNewRecipe({ ...newRecipe, ingredients: updated });
    } else {
      const updated = [...(editedRecipe?.ingredients || [])];
      updated[index] = { ...updated[index], [field]: value };
      setEditedRecipe({ ...editedRecipe!, ingredients: updated });
    }
  };

  const addInstruction = (isNew: boolean = false) => {
    if (isNew) {
      setNewRecipe({ ...newRecipe, instructions: [...newRecipe.instructions, ''] });
    } else {
      setEditedRecipe({ ...editedRecipe!, instructions: [...(editedRecipe?.instructions || []), ''] });
    }
  };

  const removeInstruction = (index: number, isNew: boolean = false) => {
    if (isNew) {
      const updated = [...newRecipe.instructions];
      updated.splice(index, 1);
      setNewRecipe({ ...newRecipe, instructions: updated });
    } else {
      const updated = [...(editedRecipe?.instructions || [])];
      updated.splice(index, 1);
      setEditedRecipe({ ...editedRecipe!, instructions: updated });
    }
  };

  const updateInstruction = (index: number, value: string, isNew: boolean = false) => {
    if (isNew) {
      const updated = [...newRecipe.instructions];
      updated[index] = value;
      setNewRecipe({ ...newRecipe, instructions: updated });
    } else {
      const updated = [...(editedRecipe?.instructions || [])];
      updated[index] = value;
      setEditedRecipe({ ...editedRecipe!, instructions: updated });
    }
  };

  // Generate and store all recipe images
  const generateAllImages = async () => {
    if (!(await confirm({ title: 'Generate all images?', description: 'This generates and permanently stores images for all recipes. It may take several minutes.', confirmText: 'Continue' }))) {
      return;
    }

    setLoading(true);
    try {
      showMessage('success', 'Started generating images... This may take a few minutes.');

      const data = await authedPost<any>('generate-all-recipe-images');

      if (data.error) {
        showMessage('error', `Failed to generate images: ${data.error}`);
        return;
      }

      showMessage('success', `Successfully generated ${data.successCount} images! ${data.skippedCount} already existed, ${data.errorCount} errors.`);
    } catch (error: any) {
      console.error('Error generating images:', error);
      showMessage('error', `Network error: ${error.message || 'Failed to connect to server. The endpoint may not be deployed yet.'}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateNutrition = async (isNew: boolean) => {
    const recipe = isNew ? newRecipe : editedRecipe;
    if (!recipe) return;

    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      showMessage('error', 'Add ingredients before calculating nutrition');
      return;
    }

    setCalculatingNutrition(true);
    setNutritionDetails(null);
    try {
      const data = await authedPost<any>('admin/calculate-nutrition', {
        ingredients: recipe.ingredients.map((ing: any) => ({
          name: ing.name,
          amount: ing.amount,
        })),
        servings: recipe.servings || 1,
      });

      if (data.error) {
        showMessage('error', `Nutrition calculation failed: ${data.error}`);
        return;
      }

      const nutrition = data.nutrition;
      if (isNew) {
        setNewRecipe({
          ...newRecipe,
          nutrition: {
            calories: nutrition.calories,
            protein: Math.round(nutrition.protein),
            carbs: Math.round(nutrition.carbs),
            fats: Math.round(nutrition.fats),
            fiber: Math.round(nutrition.fiber),
          },
        });
      } else {
        setEditedRecipe({
          ...editedRecipe!,
          nutrition: {
            calories: nutrition.calories,
            protein: Math.round(nutrition.protein),
            carbs: Math.round(nutrition.carbs),
            fats: Math.round(nutrition.fats),
            fiber: Math.round(nutrition.fiber),
          },
        });
      }

      setNutritionDetails(data.ingredientDetails || []);

      const warningCount = (data.warnings?.length || 0) + (data.errors?.length || 0);
      if (warningCount > 0) {
        showMessage('success', `Nutrition calculated (${warningCount} warning${warningCount > 1 ? 's' : ''} - check details)`);
      } else {
        showMessage('success', 'Nutrition calculated from ingredients!');
      }
    } catch (error: any) {
      console.error('Error calculating nutrition:', error);
      showMessage('error', `Failed to calculate nutrition: ${error.message || 'Network error'}`);
    } finally {
      setCalculatingNutrition(false);
    }
  };

  const validateAllNutrition = async () => {
    if (!(await confirm({ title: 'Validate all nutrition?', description: 'This validates nutrition for all recipes against the CalorieNinjas API. It may take several minutes.', confirmText: 'Continue' }))) {
      return;
    }

    setLoading(true);
    showMessage('success', 'Validating all recipes... This will take a few minutes.');
    try {
      const data = await authedPost<any>('admin/validate-nutrition');

      if (data.error) {
        showMessage('error', `Validation failed: ${data.error}`);
        return;
      }

      // Build HTML report and open in new tab
      const escapeHtml = (text: string) => {
        const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return String(text).replace(/[&<>"']/g, (c) => map[c]);
      };
      const flagged = data.report.filter((r: any) => r.flagged);

      let html = `<!DOCTYPE html><html><head><title>Nutrition Validation Report</title>
        <style>
          body { font-family: -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; background: #f9fafb; }
          h1 { color: #111827; } h2 { color: #374151; margin-top: 30px; }
          .summary { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; margin-bottom: 20px; }
          .stat { display: inline-block; margin-right: 30px; }
          .stat-val { font-size: 2em; font-weight: bold; }
          .stat-label { color: #6b7280; font-size: 0.9em; }
          table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
          th { background: #f3f4f6; padding: 12px; text-align: left; font-size: 0.85em; color: #374151; }
          td { padding: 10px 12px; border-top: 1px solid #f3f4f6; font-size: 0.9em; }
          tr:hover { background: #f9fafb; }
          .diff-high { color: #dc2626; font-weight: bold; }
          .diff-ok { color: #16a34a; }
          .badge-flagged { background: #fef2f2; color: #dc2626; padding: 2px 8px; border-radius: 9999px; font-size: 0.8em; }
          .badge-ok { background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 9999px; font-size: 0.8em; }
        </style></head><body>
        <h1>Nutrition Validation Report</h1>
        <div class="summary">
          <div class="stat"><div class="stat-val">${data.totalRecipes}</div><div class="stat-label">Total Recipes</div></div>
          <div class="stat"><div class="stat-val" style="color:#dc2626">${data.flaggedCount}</div><div class="stat-label">Flagged (&gt;20% diff)</div></div>
          <div class="stat"><div class="stat-val" style="color:#16a34a">${data.totalRecipes - data.flaggedCount}</div><div class="stat-label">Within Range</div></div>
        </div>`;

      if (flagged.length > 0) {
        html += `<h2>Flagged Recipes (>20% difference)</h2><table><tr><th>Recipe</th><th>Macro</th><th>Stored</th><th>Calculated</th><th>Diff %</th></tr>`;
        for (const r of flagged) {
          const macros = Object.entries(r.differences).filter(([_, v]: any) => v.diffPercent > 20);
          for (const [macro, v] of macros as any) {
            html += `<tr><td>${escapeHtml(r.name)}</td><td>${escapeHtml(macro)}</td><td>${v.stored}</td><td>${v.calculated}</td><td class="diff-high">${v.diffPercent}%</td></tr>`;
          }
        }
        html += `</table>`;
      }

      html += `<h2>All Recipes</h2><table><tr><th>Recipe</th><th>Status</th><th>Cal (S/C)</th><th>Protein (S/C)</th><th>Carbs (S/C)</th><th>Fats (S/C)</th><th>Fiber (S/C)</th></tr>`;
      for (const r of data.report) {
        const d = r.differences;
        const badge = r.flagged ? '<span class="badge-flagged">FLAGGED</span>' : '<span class="badge-ok">OK</span>';
        const fmt = (macro: string) => {
          if (!d[macro]) return '-';
          const cls = d[macro].diffPercent > 20 ? 'diff-high' : 'diff-ok';
          return `<span class="${cls}">${d[macro].stored} / ${d[macro].calculated}</span>`;
        };
        html += `<tr><td>${escapeHtml(r.name)}</td><td>${badge}</td><td>${fmt('calories')}</td><td>${fmt('protein')}</td><td>${fmt('carbs')}</td><td>${fmt('fats')}</td><td>${fmt('fiber')}</td></tr>`;
      }
      html += `</table></body></html>`;

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      showMessage('success', `Validation complete: ${data.flaggedCount} of ${data.totalRecipes} recipes flagged. Report opened in new tab.`);
    } catch (error: any) {
      console.error('Error validating nutrition:', error);
      showMessage('error', `Validation failed: ${error.message || 'Network error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-green-600" />
            <h1 className="text-gray-900">Recipe Database Admin</h1>
          </div>
          <p className="text-gray-600">Manage your cuisine recipe database</p>
        </div>

        {/* Message Banner */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={initializeRecipes}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
            Initialize All Recipes
          </button>

          <button
            onClick={() => {
              setShowAddRecipe(true);
              setNewRecipeAiImageLoadError(false); // Reset AI image error when opening new recipe form
            }}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-500 text-white rounded-xl hover:from-purple-600 hover:to-purple-600 transition-all shadow-md disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            Add New Recipe
          </button>
          
          <button
            onClick={generateAllImages}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
            🖼️ Generate & Store All Images
          </button>
          
          <button
            onClick={validateAllNutrition}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
            Validate All Nutrition
          </button>

          <button
            onClick={estimateRecipeCosts}
            disabled={estimatingCosts}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md disabled:opacity-50"
          >
            {estimatingCosts ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
            💷 Estimate Recipe Costs
          </button>

          <button
            onClick={fetchAllRecipes}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Image Storage System Info */}
        <div className="mb-6">
          <ImageStorageInfo />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchRecipes()}
                placeholder="Search recipes by name or ingredient..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-300"
              />
            </div>
            <button
              onClick={searchRecipes}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Recipe List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  <h2 className="font-bold">Recipes ({recipes.length})</h2>
                </div>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    Loading...
                  </div>
                ) : recipes.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No recipes found. Click "Initialize Database" to add recipes.
                  </div>
                ) : (
                  recipes.map((recipe) => (
                    <button
                      key={recipe.key}
                      onClick={() => viewRecipe(recipe.key)}
                      className={`w-full p-4 text-left border-b border-gray-100 hover:bg-green-50 transition-colors ${
                        selectedRecipe?.id === recipe.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getMealTypeEmoji(recipe.meal_type)}</span>
                          <div>
                            <div className="font-semibold text-gray-900">{recipe.name}</div>
                            <div className="text-xs text-gray-500 capitalize">{recipe.recipe_category || recipe.category}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full border ${getMealTypeColor(recipe.meal_type)}`}>
                          {recipe.meal_type}
                        </span>
                        <span className="text-gray-600">{recipe.cookingTime}min</span>
                        {recipe.rating && <span className="text-amber-600 font-semibold">★ {recipe.rating}</span>}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="md:col-span-2">
            {selectedRecipe ? (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{getMealTypeEmoji(selectedRecipe.meal_type)}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
                        <p className="text-sm text-white/90 capitalize">{selectedRecipe.meal_type} - {selectedRecipe.recipe_category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRecipe(null);
                        setSelectedRecipeKey(null);
                      }}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 max-h-[600px] overflow-y-auto">
                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-6">
                    {!editMode ? (
                      <>
                        <button
                          onClick={() => setEditMode(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => selectedRecipeKey && deleteRecipe(selectedRecipeKey)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={saveRecipe}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditMode(false);
                            setEditedRecipe(selectedRecipe);
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>

                  {/* Recipe Details */}
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">Name</label>
                          {editMode ? (
                            <input
                              type="text"
                              value={editedRecipe?.name || ''}
                              onChange={(e) => setEditedRecipe({ ...editedRecipe!, name: e.target.value })}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                            />
                          ) : (
                            <div className="text-gray-900 font-medium">{selectedRecipe.name}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Category</label>
                          <div className="text-gray-900 font-medium capitalize">{selectedRecipe.category}</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Cooking Time</label>
                          <div className="text-gray-900 font-medium">{selectedRecipe.cookingTime} minutes</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Servings</label>
                          <div className="text-gray-900 font-medium">{selectedRecipe.servings}</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Difficulty</label>
                          <div className="text-gray-900 font-medium capitalize">{selectedRecipe.difficulty}</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Meal Type</label>
                          <div className="text-gray-900 font-medium capitalize">{selectedRecipe.meal_type}</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Rating</label>
                          <div className="text-gray-900 font-medium">{selectedRecipe.rating ? `★ ${selectedRecipe.rating}` : 'N/A'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                      {editMode ? (
                        <textarea
                          value={editedRecipe?.description || ''}
                          onChange={(e) => setEditedRecipe({ ...editedRecipe!, description: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-700">{selectedRecipe.description}</p>
                      )}
                    </div>

                    {/* Image Query */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Recipe Image
                      </h3>
                      {editMode ? (
                        <div className="space-y-4">
                          {/* Info banner */}
                          <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 border border-gray-200 rounded-lg p-3">
                            <p className="text-xs text-gray-700 text-center">
                              <span className="font-semibold">Three ways to add images:</span> 
                              <span className="text-blue-600 mx-1">🔵 Upload Custom</span> (best quality) • 
                              <span className="text-green-600 mx-1">🟢 View Stored</span> (current) • 
                              <span className="text-purple-600 mx-1">🟣 Generate AI</span> (quick)
                            </p>
                          </div>
                          {/* Custom Image Upload Section */}
                          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                              <Upload className="w-4 h-4" />
                              Upload Custom Image
                            </h4>
                            <p className="text-xs text-blue-700 mb-3">Upload your own image for this recipe (JPG, PNG, WebP, or GIF, max 5MB)</p>
                            
                            <div className="space-y-3">
                              {!imagePreview ? (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-blue-50 transition-colors">
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 text-blue-500 mb-2" />
                                    <p className="text-sm text-blue-600 font-medium">Click to upload image</p>
                                    <p className="text-xs text-blue-500">or drag and drop</p>
                                  </div>
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleImageFileSelect}
                                  />
                                </label>
                              ) : (
                                <div className="space-y-2">
                                  <div className="relative">
                                    <img
                                      src={imagePreview}
                                      alt="Upload preview"
                                      className="w-full h-48 object-cover rounded-lg border-2 border-blue-300"
                                    />
                                    <button
                                      onClick={handleClearImage}
                                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                      title="Remove image"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <button
                                    onClick={handleUploadCustomImage}
                                    disabled={uploadingImage}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    {uploadingImage ? (
                                      <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Uploading...
                                      </>
                                    ) : (
                                      <>
                                        <Upload className="w-4 h-4" />
                                        Upload This Image
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Current Image Display */}
                          {editedRecipe?.imageUrl && (
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                              <h4 className="font-semibold text-green-900 mb-2">Current Stored Image</h4>
                              <img
                                src={editedRecipe.imageUrl}
                                alt={editedRecipe.name}
                                className="w-full h-48 object-cover rounded-lg border-2 border-green-300"
                              />
                              <p className="text-xs text-green-700 mt-2">✓ This image is permanently stored</p>
                            </div>
                          )}

                          {/* Divider */}
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500">OR</span>
                            </div>
                          </div>

                          {/* Image URL Section */}
                          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                              <ImageIcon className="w-4 h-4" />
                              Image URL
                            </h4>
                            <div>
                              <label className="text-sm text-purple-700">Direct Image URL</label>
                              <input
                                type="text"
                                value={editedRecipe?.imageUrl || editedRecipe?.image?.url || ''}
                                onChange={(e) => {
                                  setEditedRecipe({ ...editedRecipe!, imageUrl: e.target.value });
                                }}
                                placeholder="https://example.com/image.jpg"
                                className="w-full mt-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
                              />
                            </div>
                            {(editedRecipe?.imageUrl || editedRecipe?.image?.url) && (
                              <div className="mt-3">
                                <label className="text-sm text-purple-700 mb-2 block">Preview:</label>
                                <img
                                  src={editedRecipe.imageUrl || editedRecipe.image?.url || LOCAL_IMAGE_FALLBACK}
                                  alt={editedRecipe.name}
                                  className="w-full h-48 object-cover rounded-lg border-2 border-purple-300"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = LOCAL_IMAGE_FALLBACK;
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {(selectedRecipe.imageUrl || selectedRecipe.image?.url) ? (
                            <div>
                              <img
                                src={selectedRecipe.imageUrl || selectedRecipe.image?.url || LOCAL_IMAGE_FALLBACK}
                                alt={selectedRecipe.name}
                                className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = LOCAL_IMAGE_FALLBACK;
                                }}
                              />
                              {selectedRecipe.sourceUrl && (
                                <a href={selectedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 mt-1 hover:underline block">View original recipe</a>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No image available</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* External Links */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <ExternalLink className="w-5 h-5" />
                        External Links
                      </h3>
                      {editMode ? (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-600">Recipe Source URL</label>
                            <input
                              type="url"
                              value={editedRecipe?.sourceUrl || ''}
                              onChange={(e) => setEditedRecipe({ ...editedRecipe!, sourceUrl: e.target.value })}
                              placeholder="https://www.allrecipes.com/recipe/..."
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedRecipe.sourceUrl ? (
                            <a href={selectedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                              <ExternalLink className="w-4 h-4" /> {(() => { try { return new URL(selectedRecipe.sourceUrl).hostname.replace('www.', ''); } catch { return 'Source'; } })()}
                            </a>
                          ) : (
                            <p className="text-sm text-gray-400">No source link</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Ingredients */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
                      <div className="space-y-2">
                        {selectedRecipe.ingredients?.map((ing, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-gray-900 font-medium">{ing.name}</span>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-3">
                              <span>{ing.amount}</span>
                              <span className="text-green-600 font-semibold">£{ing.estimatedPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
                      <ol className="space-y-3">
                        {selectedRecipe.instructions?.map((instruction, idx) => (
                          <li key={idx} className="flex gap-3">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                              {idx + 1}
                            </div>
                            <p className="text-gray-700 pt-1">{instruction}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Nutrition */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Nutrition (per serving)</h3>
                        {editMode && (
                          <button
                            onClick={() => calculateNutrition(false)}
                            disabled={calculatingNutrition}
                            className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors text-sm disabled:opacity-50"
                          >
                            {calculatingNutrition ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                            Auto-Calculate
                          </button>
                        )}
                      </div>
                      {editMode ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-5 gap-3">
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Calories</label>
                              <input
                                type="number"
                                value={editedRecipe?.nutrition?.calories || 0}
                                onChange={(e) => setEditedRecipe({ ...editedRecipe!, nutrition: { ...editedRecipe!.nutrition, calories: parseInt(e.target.value) || 0 }})}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Protein (g)</label>
                              <input
                                type="number"
                                value={editedRecipe?.nutrition?.protein || 0}
                                onChange={(e) => setEditedRecipe({ ...editedRecipe!, nutrition: { ...editedRecipe!.nutrition, protein: parseInt(e.target.value) || 0 }})}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Carbs (g)</label>
                              <input
                                type="number"
                                value={editedRecipe?.nutrition?.carbs || 0}
                                onChange={(e) => setEditedRecipe({ ...editedRecipe!, nutrition: { ...editedRecipe!.nutrition, carbs: parseInt(e.target.value) || 0 }})}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Fats (g)</label>
                              <input
                                type="number"
                                value={editedRecipe?.nutrition?.fats || 0}
                                onChange={(e) => setEditedRecipe({ ...editedRecipe!, nutrition: { ...editedRecipe!.nutrition, fats: parseInt(e.target.value) || 0 }})}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">Fiber (g)</label>
                              <input
                                type="number"
                                value={editedRecipe?.nutrition?.fiber || 0}
                                onChange={(e) => setEditedRecipe({ ...editedRecipe!, nutrition: { ...editedRecipe!.nutrition, fiber: parseInt(e.target.value) || 0 }})}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </div>
                          </div>
                          {/* Ingredient-by-ingredient breakdown after calculation */}
                          {nutritionDetails && nutritionDetails.length > 0 && (
                            <div className="mt-3 bg-gray-50 rounded-lg p-3">
                              <h4 className="text-xs font-semibold text-gray-700 mb-2">Ingredient Breakdown</h4>
                              <div className="space-y-1">
                                {nutritionDetails.map((detail: any, idx: number) => (
                                  <div key={idx} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                      {detail.error ? (
                                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
                                      ) : detail.warning ? (
                                        <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                                      ) : (
                                        <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
                                      )}
                                      <span className="text-gray-700">{detail.name} ({detail.amount})</span>
                                    </div>
                                    <div className="text-gray-500">
                                      {detail.nutrition ? (
                                        <span>{detail.nutrition.calories} cal | {detail.nutrition.protein}p | {detail.nutrition.carbs}c | {detail.nutrition.fats}f</span>
                                      ) : (
                                        <span className="text-red-500">{detail.error || detail.warning || 'No data'}</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-3">
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="text-xs text-amber-700">Calories</div>
                            <div className="font-bold text-amber-900">{selectedRecipe.nutrition.calories}</div>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="text-xs text-red-700">Protein</div>
                            <div className="font-bold text-red-900">{selectedRecipe.nutrition.protein}g</div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-xs text-blue-700">Carbs</div>
                            <div className="font-bold text-blue-900">{selectedRecipe.nutrition.carbs}g</div>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-xs text-purple-700">Fats</div>
                            <div className="font-bold text-purple-900">{selectedRecipe.nutrition.fats}g</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecipe.tags?.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm border border-green-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-12 text-center">
                <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a recipe from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Recipe Modal */}
      {showAddRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Add New Recipe</h2>
                </div>
                <button
                  onClick={() => setShowAddRecipe(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Recipe ID *</label>
                      <input
                        type="text"
                        value={newRecipe.id}
                        onChange={(e) => setNewRecipe({ ...newRecipe, id: e.target.value })}
                        placeholder="e.g., cottage-pie"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Recipe Name *</label>
                      <input
                        type="text"
                        value={newRecipe.name}
                        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                        placeholder="e.g., Cottage Pie"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Meal Type *</label>
                      <select
                        value={newRecipe.meal_type}
                        onChange={(e) => setNewRecipe({ ...newRecipe, meal_type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      >
                        <option value="work">Work</option>
                        <option value="fitness">Fitness</option>
                        <option value="study">Study</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Recipe Category</label>
                      <select
                        value={newRecipe.recipe_category}
                        onChange={(e) => setNewRecipe({ ...newRecipe, recipe_category: e.target.value, category: e.target.value.toLowerCase() })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Cooking Time (minutes)</label>
                      <input
                        type="number"
                        value={newRecipe.cookingTime}
                        onChange={(e) => setNewRecipe({ ...newRecipe, cookingTime: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Servings</label>
                      <input
                        type="number"
                        value={newRecipe.servings}
                        onChange={(e) => setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Difficulty</label>
                      <select
                        value={newRecipe.difficulty}
                        onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Cuisine</label>
                      <input
                        type="text"
                        value={newRecipe.cuisine}
                        onChange={(e) => setNewRecipe({ ...newRecipe, cuisine: e.target.value })}
                        placeholder="e.g., American, Italian"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Description</label>
                  <textarea
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                    placeholder="Describe the recipe..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    rows={3}
                  />
                </div>

                {/* Recipe Image Section */}
                <div className="space-y-4">
                  {/* Info banner */}
                  <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-700 text-center">
                      <span className="font-semibold">Add recipe image:</span> 
                      <span className="text-blue-600 mx-1">🔵 Upload Custom</span> (recommended) or 
                      <span className="text-purple-600 mx-1">🟣 Generate with AI</span> (quick)
                    </p>
                  </div>
                  {/* Custom Image Upload */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Custom Image
                    </h4>
                    <p className="text-xs text-blue-700 mb-3">Upload your own image (recommended, max 5MB)</p>
                    
                    {!newRecipeImagePreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-blue-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-blue-500 mb-2" />
                          <p className="text-sm text-blue-600 font-medium">Click to upload image</p>
                          <p className="text-xs text-blue-500">JPG, PNG, WebP, or GIF</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleNewRecipeImageSelect}
                        />
                      </label>
                    ) : (
                      <div className="space-y-2">
                        <div className="relative">
                          <img
                            src={newRecipeImagePreview}
                            alt="Upload preview"
                            className="w-full h-48 object-cover rounded-lg border-2 border-blue-300"
                          />
                          <button
                            type="button"
                            onClick={handleClearNewRecipeImage}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-green-600">✓ Image ready to upload with recipe</p>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* Image URL */}
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Image URL
                    </h4>
                    <label className="text-sm text-purple-700 block mb-1">Direct Image URL</label>
                    <input
                      type="text"
                      value={newRecipe.imageUrl || ''}
                      onChange={(e) => {
                        setNewRecipe({ ...newRecipe, imageUrl: e.target.value });
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    {newRecipe.imageUrl && (
                      <div className="mt-3">
                        <label className="text-sm text-purple-700 mb-2 block">Preview:</label>
                        <img
                          src={newRecipe.imageUrl || LOCAL_IMAGE_FALLBACK}
                          alt={newRecipe.name || 'Recipe preview'}
                          className="w-full h-48 object-cover rounded-lg border-2 border-purple-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = LOCAL_IMAGE_FALLBACK;
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* External Links */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    External Links
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Recipe Source URL</label>
                      <input
                        type="url"
                        value={newRecipe.sourceUrl || ''}
                        onChange={(e) => setNewRecipe({ ...newRecipe, sourceUrl: e.target.value })}
                        placeholder="https://www.allrecipes.com/recipe/..."
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Ingredients</h3>
                    <button
                      onClick={() => addIngredient(true)}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Ingredient
                    </button>
                  </div>
                  <div className="space-y-2">
                    {newRecipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={ing.name}
                          onChange={(e) => updateIngredient(idx, 'name', e.target.value, true)}
                          placeholder="Ingredient name"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          value={ing.amount}
                          onChange={(e) => updateIngredient(idx, 'amount', e.target.value, true)}
                          placeholder="Amount"
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={ing.estimatedPrice}
                          onChange={(e) => updateIngredient(idx, 'estimatedPrice', parseFloat(e.target.value) || 0, true)}
                          placeholder="Price (£)"
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          onClick={() => removeIngredient(idx, true)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {newRecipe.ingredients.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No ingredients added yet</p>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Instructions</h3>
                    <button
                      onClick={() => addInstruction(true)}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </button>
                  </div>
                  <div className="space-y-2">
                    {newRecipe.instructions.map((instruction, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-semibold mt-2">
                          {idx + 1}
                        </div>
                        <textarea
                          value={instruction}
                          onChange={(e) => updateInstruction(idx, e.target.value, true)}
                          placeholder="Enter instruction step..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          rows={2}
                        />
                        <button
                          onClick={() => removeInstruction(idx, true)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {newRecipe.instructions.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No instructions added yet</p>
                    )}
                  </div>
                </div>

                {/* Nutrition */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Nutrition Information</h3>
                    <button
                      onClick={() => calculateNutrition(true)}
                      disabled={calculatingNutrition}
                      className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors text-sm disabled:opacity-50"
                    >
                      {calculatingNutrition ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                      Auto-Calculate
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Calories</label>
                      <input
                        type="number"
                        value={newRecipe.nutrition.calories}
                        onChange={(e) => setNewRecipe({ ...newRecipe, nutrition: { ...newRecipe.nutrition, calories: parseInt(e.target.value) || 0 }})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Protein (g)</label>
                      <input
                        type="number"
                        value={newRecipe.nutrition.protein}
                        onChange={(e) => setNewRecipe({ ...newRecipe, nutrition: { ...newRecipe.nutrition, protein: parseInt(e.target.value) || 0 }})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Carbs (g)</label>
                      <input
                        type="number"
                        value={newRecipe.nutrition.carbs}
                        onChange={(e) => setNewRecipe({ ...newRecipe, nutrition: { ...newRecipe.nutrition, carbs: parseInt(e.target.value) || 0 }})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Fats (g)</label>
                      <input
                        type="number"
                        value={newRecipe.nutrition.fats}
                        onChange={(e) => setNewRecipe({ ...newRecipe, nutrition: { ...newRecipe.nutrition, fats: parseInt(e.target.value) || 0 }})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Fiber (g)</label>
                      <input
                        type="number"
                        value={newRecipe.nutrition.fiber}
                        onChange={(e) => setNewRecipe({ ...newRecipe, nutrition: { ...newRecipe.nutrition, fiber: parseInt(e.target.value) || 0 }})}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  {/* Ingredient-by-ingredient breakdown after calculation */}
                  {nutritionDetails && nutritionDetails.length > 0 && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">Ingredient Breakdown</h4>
                      <div className="space-y-1">
                        {nutritionDetails.map((detail: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                              {detail.error ? (
                                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
                              ) : detail.warning ? (
                                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
                              )}
                              <span className="text-gray-700">{detail.name} ({detail.amount})</span>
                            </div>
                            <div className="text-gray-500">
                              {detail.nutrition ? (
                                <span>{detail.nutrition.calories} cal | {detail.nutrition.protein}p | {detail.nutrition.carbs}c | {detail.nutrition.fats}f</span>
                              ) : (
                                <span className="text-red-500">{detail.error || detail.warning || 'No data'}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newRecipe.tags.join(', ')}
                    onChange={(e) => setNewRecipe({ ...newRecipe, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                    placeholder="e.g., comfort food, budget-friendly, high-protein"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowAddRecipe(false)}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewRecipe}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Recipe
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}