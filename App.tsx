import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import StageScript from './components/StageScript';
import StageAssets from './components/StageAssets';
import StageDirector from './components/StageDirector';
import StageExport from './components/StageExport';
import StagePrompts from './components/StagePrompts';
import Dashboard from './components/Dashboard';
import Onboarding, { shouldShowOnboarding, resetOnboarding } from './components/Onboarding';
import ModelConfigModal from './components/ModelConfig';
import { ProjectState } from './types';
import { Save, CheckCircle, X } from 'lucide-react';
import { saveProjectToDB } from './services/storageService';
import { setGlobalApiKey } from './services/geminiService';
import { setLogCallback, clearLogCallback } from './services/renderLogService';
const LOGO_URL = 'https://www.gitcc.com/uploads/-/system/appearance/header_logo/1/gitpp.png';

function App() {
  const [project, setProject] = useState<ProjectState | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [showSaveStatus, setShowSaveStatus] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showModelConfig, setShowModelConfig] = useState(false);
  
  // Ref to hold debounce timer
  const saveTimeoutRef = useRef<any>(null);
  const hideStatusTimeoutRef = useRef<any>(null);

  // Detect mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load API Key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('antsk_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setGlobalApiKey(storedKey);
    }
    // 检查是否需要显示首次引导（无论有没有 API Key）
    if (shouldShowOnboarding()) {
      setShowOnboarding(true);
    }
  }, []);

  // 处理引导完成
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // 处理快速开始选项
  const handleOnboardingQuickStart = (option: 'script' | 'example') => {
    setShowOnboarding(false);
    // 如果选择"从剧本开始"，可以后续扩展为创建新项目
    // 如果选择"看看示例项目"，可以后续扩展为打开示例项目
    console.log('Quick start option:', option);
  };

  // 重新显示引导（供帮助菜单调用）
  const handleShowOnboarding = () => {
    resetOnboarding();
    setShowOnboarding(true);
  };

  // 保存 API Key（从设置或引导中）
  const handleSaveApiKey = (key: string) => {
    if (key) {
      setApiKey(key);
      setGlobalApiKey(key);
      localStorage.setItem('antsk_api_key', key);
    } else {
      setApiKey('');
      setGlobalApiKey('');
      localStorage.removeItem('antsk_api_key');
    }
  };

  // 显示模型配置弹窗
  const handleShowModelConfig = () => {
    setShowModelConfig(true);
  };

  // Global error handler to catch API Key errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if error is related to API Key
      if (event.error?.name === 'ApiKeyError' || 
          event.error?.message?.includes('API Key missing') ||
          event.error?.message?.includes('AntSK API Key')) {
        console.warn('🔐 检测到 API Key 错误，请配置 API Key...');
        setShowModelConfig(true); // 打开模型配置弹窗让用户配置
        event.preventDefault(); // Prevent default error display
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Check if rejection is related to API Key
      if (event.reason?.name === 'ApiKeyError' ||
          event.reason?.message?.includes('API Key missing') ||
          event.reason?.message?.includes('AntSK API Key')) {
        console.warn('🔐 检测到 API Key 错误，请配置 API Key...');
        setShowModelConfig(true); // 打开模型配置弹窗让用户配置
        event.preventDefault(); // Prevent default error display
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Setup render log callback
  useEffect(() => {
    if (project) {
      setLogCallback((log) => {
        setProject(prev => {
          if (!prev) return null;
          return {
            ...prev,
            renderLogs: [...(prev.renderLogs || []), log]
          };
        });
      });
    } else {
      clearLogCallback();
    }
    
    return () => clearLogCallback();
  }, [project?.id]); // Re-setup when project changes

  // Auto-save logic
  useEffect(() => {
    if (!project) return;

    setSaveStatus('unsaved');
    setShowSaveStatus(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        await saveProjectToDB(project);
        setSaveStatus('saved');
      } catch (e) {
        console.error("Auto-save failed", e);
      }
    }, 1000); // Debounce 1s

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [project]);

  // Auto-hide save status after 2 seconds
  useEffect(() => {
    if (saveStatus === 'saved') {
      if (hideStatusTimeoutRef.current) clearTimeout(hideStatusTimeoutRef.current);
      hideStatusTimeoutRef.current = setTimeout(() => {
        setShowSaveStatus(false);
      }, 2000);
    } else if (saveStatus === 'saving') {
      setShowSaveStatus(true);
      if (hideStatusTimeoutRef.current) clearTimeout(hideStatusTimeoutRef.current);
    }

    return () => {
      if (hideStatusTimeoutRef.current) clearTimeout(hideStatusTimeoutRef.current);
    };
  }, [saveStatus]);


  const updateProject = (updates: Partial<ProjectState> | ((prev: ProjectState) => ProjectState)) => {
    if (!project) return;
    setProject(prev => {
      if (!prev) return null;
      // 支持函数式更新
      if (typeof updates === 'function') {
        return updates(prev);
      }
      return { ...prev, ...updates };
    });
  };

  const setStage = (stage: 'script' | 'assets' | 'director' | 'export' | 'prompts') => {
    updateProject({ stage });
  };

  const handleOpenProject = (proj: ProjectState) => {
    setProject(proj);
  };

  const handleExitProject = async () => {
    // Force save before exiting
    if (project) {
        await saveProjectToDB(project);
    }
    setProject(null);
  };

  const renderStage = () => {
    if (!project) return null;
    switch (project.stage) {
      case 'script':
        return <StageScript project={project} updateProject={updateProject} />;
      case 'assets':
        return <StageAssets project={project} updateProject={updateProject} />;
      case 'director':
        return <StageDirector project={project} updateProject={updateProject} />;
      case 'export':
        return <StageExport project={project} />;
      case 'prompts':
        return <StagePrompts project={project} updateProject={updateProject} />;
      default:
        return <div className="text-white">未知阶段</div>;
    }
  };

  // Mobile Warning Screen
  if (isMobile) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <img src={LOGO_URL} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">漫剧工场</h1>
          <div className="bg-[#0A0A0A] border border-zinc-800 rounded-xl p-8">
            <p className="text-zinc-400 text-base leading-relaxed mb-4">
              为了获得最佳体验，请使用 PC 端浏览器访问。
            </p>
            <p className="text-zinc-600 text-sm">
              本应用需要较大的屏幕空间和桌面级浏览器环境才能正常运行。
            </p>
          </div>
          <div className="text-xs text-zinc-700">
            <a href="https://www.gitcc.com/" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
              访问产品首页了解更多
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  if (!project) {
    return (
       <>
         <Dashboard 
           onOpenProject={handleOpenProject} 
           onShowOnboarding={handleShowOnboarding}
           onShowModelConfig={handleShowModelConfig}
         />
         {showOnboarding && (
           <Onboarding 
             onComplete={handleOnboardingComplete}
             onQuickStart={handleOnboardingQuickStart}
             currentApiKey={apiKey}
             onSaveApiKey={handleSaveApiKey}
           />
         )}
         <ModelConfigModal
           isOpen={showModelConfig}
           onClose={() => setShowModelConfig(false)}
         />
       </>
    );
  }

  // Workspace View
  return (
    <div className="flex h-screen bg-[#121212] font-sans text-gray-100 selection:bg-indigo-500/30">
      <Sidebar 
        currentStage={project.stage} 
        setStage={setStage} 
        onExit={handleExitProject} 
        projectName={project.title}
        onShowOnboarding={handleShowOnboarding}
        onShowModelConfig={() => setShowModelConfig(true)}
      />
      
      <main className="ml-72 flex-1 h-screen overflow-hidden relative">
        {renderStage()}
        
        {/* Save Status Indicator */}
        {showSaveStatus && (
          <div className="absolute top-4 right-6 pointer-events-none flex items-center gap-2 text-xs font-mono text-zinc-400 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm z-50 animate-in fade-in slide-in-from-top-2 duration-200">
             {saveStatus === 'saving' ? (
               <>
                 <Save className="w-3 h-3 animate-pulse" />
                 保存中...
               </>
             ) : (
               <>
                 <CheckCircle className="w-3 h-3 text-green-500" />
                 已保存
               </>
             )}
          </div>
        )}
      </main>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <Onboarding 
          onComplete={handleOnboardingComplete}
          onQuickStart={handleOnboardingQuickStart}
          currentApiKey={apiKey}
          onSaveApiKey={handleSaveApiKey}
        />
      )}

      {/* Model Config Modal */}
      <ModelConfigModal
        isOpen={showModelConfig}
        onClose={() => setShowModelConfig(false)}
      />
    </div>
  );
}

export default App;