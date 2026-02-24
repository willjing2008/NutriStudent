// Translation strings for English and Simplified Chinese

export type Language = 'en' | 'zh-CN';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    plan: 'Plan',
    shop: 'Shop',
    leaderboard: 'Ranks',
    profile: 'Profile',
    
    // Dashboard
    yourMealPlans: 'Your Meal Plans',
    currentlyActive: 'Currently Active',
    savedPlans: 'Saved Plans',
    noSavedPlans: 'No saved plans yet. Create a plan to see it here.',
    createNewPlan: 'Create New Plan',
    aiPowered: 'AI-powered meal planning in minutes',
    viewDetails: 'View Details',
    onTrackToday: 'On track today',
    
    // Stats
    calories: 'Calories',
    protein: 'Protein',
    costPerDay: 'Cost/Day',
    
    // Actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    deletePlan: 'Delete Plan',
    manage: 'Manage',
    
    // Profile
    settings: 'Settings',
    language: 'Language',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    account: 'Account',
    logOut: 'Log Out',
    english: 'English',
    chinese: '中文',
    
    // Goals
    bulk: 'Bulk',
    cut: 'Cut',
    maintain: 'Maintain',
    
    // Time
    created: 'Created',
    week: 'WEEK',
  },
  
  'zh-CN': {
    // Navigation
    home: '首页',
    plan: '计划',
    shop: '购物',
    leaderboard: '排行',
    profile: '我的',
    
    // Dashboard
    yourMealPlans: '我的膳食计划',
    currentlyActive: '当前使用中',
    savedPlans: '已保存的计划',
    noSavedPlans: '暂无保存的计划。创建一个计划后会显示在这里。',
    createNewPlan: '创建新计划',
    aiPowered: 'AI智能膳食规划，几分钟即可完成',
    viewDetails: '查看详情',
    onTrackToday: '今日进度正常',
    
    // Stats
    calories: '卡路里',
    protein: '蛋白质',
    costPerDay: '每日花费',
    
    // Actions
    save: '保存',
    cancel: '取消',
    delete: '删除',
    deletePlan: '删除计划',
    manage: '管理',
    
    // Profile
    settings: '设置',
    language: '语言',
    darkMode: '深色模式',
    notifications: '通知',
    account: '账户',
    logOut: '退出登录',
    english: 'English',
    chinese: '中文',
    
    // Goals
    bulk: '增肌',
    cut: '减脂',
    maintain: '维持',
    
    // Time
    created: '创建于',
    week: '第周',
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations.en): string => {
  return translations[lang][key] || translations.en[key] || key;
};
