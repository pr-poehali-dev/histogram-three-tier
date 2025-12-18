import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FlowNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'data' | 'check';
  label: string;
  description?: string;
  status?: 'success' | 'error' | 'pending';
}

const Index = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const testFlowNodes: FlowNode[] = [
    { 
      id: '1', 
      type: 'start', 
      label: 'Начало теста', 
      description: 'Инициализация тестового окружения'
    },
    { 
      id: '2', 
      type: 'process', 
      label: 'Переход на /register', 
      description: 'browser.visit("/register")'
    },
    { 
      id: '3', 
      type: 'data', 
      label: 'Заполнение формы', 
      description: 'name, email, password'
    },
    { 
      id: '4', 
      type: 'process', 
      label: 'POST /api/register', 
      description: 'Отправка данных на сервер'
    },
    { 
      id: '5', 
      type: 'check', 
      label: 'Проверка ответа', 
      description: 'status === 201'
    },
    { 
      id: '6', 
      type: 'check', 
      label: 'Проверка редиректа', 
      description: 'url === "/dashboard"'
    },
    { 
      id: '7', 
      type: 'check', 
      label: 'Проверка сообщения', 
      description: 'Success message visible'
    },
    { 
      id: '8', 
      type: 'check', 
      label: 'Проверка записи в БД', 
      description: 'SELECT * FROM users WHERE email'
    },
    { 
      id: '9', 
      type: 'decision', 
      label: 'Все проверки пройдены?', 
      description: 'Итоговая валидация'
    },
    { 
      id: '10', 
      type: 'end', 
      label: 'Тест пройден ✓', 
      status: 'success'
    },
    { 
      id: '11', 
      type: 'end', 
      label: 'Тест провален ✗', 
      status: 'error'
    }
  ];

  const getNodeStyle = (type: string, status?: string) => {
    if (status === 'success') {
      return {
        shape: 'rounded-full',
        color: 'from-green-500 to-green-700',
        icon: 'CheckCircle',
        border: 'border-green-600'
      };
    }
    if (status === 'error') {
      return {
        shape: 'rounded-full',
        color: 'from-red-500 to-red-700',
        icon: 'XCircle',
        border: 'border-red-600'
      };
    }

    switch (type) {
      case 'start':
        return {
          shape: 'rounded-full',
          color: 'from-blue-500 to-blue-700',
          icon: 'Play',
          border: 'border-blue-600'
        };
      case 'process':
        return {
          shape: 'rounded-lg',
          color: 'from-purple-500 to-purple-700',
          icon: 'ArrowRight',
          border: 'border-purple-600'
        };
      case 'data':
        return {
          shape: 'rounded-lg skew-x-6',
          color: 'from-cyan-500 to-cyan-700',
          icon: 'Database',
          border: 'border-cyan-600'
        };
      case 'check':
        return {
          shape: 'rounded-lg',
          color: 'from-yellow-500 to-yellow-700',
          icon: 'Search',
          border: 'border-yellow-600'
        };
      case 'decision':
        return {
          shape: 'rotate-45',
          color: 'from-orange-500 to-orange-700',
          icon: 'GitBranch',
          border: 'border-orange-600'
        };
      case 'end':
        return {
          shape: 'rounded-full',
          color: 'from-slate-500 to-slate-700',
          icon: 'Flag',
          border: 'border-slate-600'
        };
      default:
        return {
          shape: 'rounded-lg',
          color: 'from-gray-500 to-gray-700',
          icon: 'Box',
          border: 'border-gray-600'
        };
    }
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= testFlowNodes.length) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationStep(-1);
      } else {
        setSimulationStep(step);
      }
    }, 1200);
  };

  const resetSimulation = () => {
    setSimulationStep(-1);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Блок-схема теста регистрации
          </h1>
          <p className="text-lg text-slate-600">
            Визуализация процесса тестирования пользовательской регистрации
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="TestTube" size={24} className="text-purple-600" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Симуляция выполнения теста</h3>
                <p className="text-sm text-slate-600">Наблюдайте за прохождением теста шаг за шагом</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={startSimulation}
                disabled={isSimulating}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  isSimulating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:scale-105 shadow-lg'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name="Play" size={20} />
                  Запустить
                </div>
              </button>
              <button
                onClick={resetSimulation}
                disabled={isSimulating}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  isSimulating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-slate-500 to-slate-700 text-white hover:scale-105 shadow-lg'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name="RotateCcw" size={20} />
                  Сброс
                </div>
              </button>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-white/80 backdrop-blur-sm">
          <div className="space-y-4 max-w-2xl mx-auto">
            {testFlowNodes.map((node, index) => {
              const style = getNodeStyle(node.type, node.status);
              const isHovered = hoveredNode === node.id;
              const isActive = simulationStep === index;
              const isPassed = simulationStep > index;
              const isDecision = node.type === 'decision';
              const showBranches = index === 8;

              return (
                <div key={node.id} className="relative">
                  <div
                    className={`relative transition-all duration-500 ${
                      isHovered ? 'scale-105 z-10' : ''
                    } ${isActive ? 'scale-110 z-20' : ''} ${isPassed ? 'opacity-60' : ''}`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`relative bg-gradient-to-br ${style.color} p-6 ${
                        isDecision ? style.shape + ' p-10' : style.shape
                      } text-white shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
                        isActive ? 'ring-4 ring-yellow-400 animate-pulse' : style.border
                      }`}
                    >
                      {isDecision && (
                        <div className="-rotate-45 flex flex-col items-center justify-center">
                          <Icon name={style.icon as any} size={28} className="mb-2" />
                          <div className="text-center font-bold">{node.label}</div>
                        </div>
                      )}
                      
                      {!isDecision && (
                        <div className="flex items-center gap-4">
                          <div className={`p-2 bg-white/20 rounded-lg backdrop-blur-sm ${node.type === 'data' ? '-skew-x-6' : ''}`}>
                            <Icon name={style.icon as any} size={32} />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-lg mb-1">{node.label}</div>
                            {node.description && (
                              <div className="text-sm text-white/90 font-mono bg-black/20 px-2 py-1 rounded">
                                {node.description}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {isActive && (
                        <div className="absolute -right-14 top-1/2 -translate-y-1/2 animate-bounce">
                          <Icon name="Zap" size={32} className="text-yellow-500 drop-shadow-lg" />
                        </div>
                      )}
                    </div>

                    <div className={`absolute -top-4 -left-4 ${isActive ? 'bg-yellow-500' : isPassed ? 'bg-green-500' : 'bg-slate-700'} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transition-all`}>
                      {isPassed ? '✓' : index + 1}
                    </div>
                  </div>

                  {showBranches ? (
                    <div className="flex justify-center py-6 gap-16">
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-bold text-green-600 mb-2 bg-green-50 px-4 py-2 rounded-lg border-2 border-green-300">
                          ДА ✓
                        </div>
                        <Icon name="ArrowDown" size={32} className="text-green-500" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-sm font-bold text-red-600 mb-2 bg-red-50 px-4 py-2 rounded-lg border-2 border-red-300">
                          НЕТ ✗
                        </div>
                        <Icon name="ArrowDown" size={32} className="text-red-500" />
                      </div>
                    </div>
                  ) : index < 8 && (
                    <div className="flex justify-center py-4">
                      <Icon name="ArrowDown" size={32} className={`${isActive || isPassed ? 'text-purple-600' : 'text-slate-400'} transition-colors`} />
                    </div>
                  )}

                  {showBranches && (
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex justify-center">
                        {testFlowNodes[9] && (() => {
                          const successStyle = getNodeStyle(testFlowNodes[9].type, testFlowNodes[9].status);
                          return (
                            <div className={`bg-gradient-to-br ${successStyle.color} p-6 ${successStyle.shape} text-white shadow-lg w-full max-w-xs text-center`}>
                              <Icon name={successStyle.icon as any} size={32} className="mx-auto mb-2" />
                              <div className="font-bold text-lg">{testFlowNodes[9].label}</div>
                            </div>
                          );
                        })()}
                      </div>
                      <div className="flex justify-center">
                        {testFlowNodes[10] && (() => {
                          const errorStyle = getNodeStyle(testFlowNodes[10].type, testFlowNodes[10].status);
                          return (
                            <div className={`bg-gradient-to-br ${errorStyle.color} p-6 ${errorStyle.shape} text-white shadow-lg w-full max-w-xs text-center`}>
                              <Icon name={errorStyle.icon as any} size={32} className="mx-auto mb-2" />
                              <div className="font-bold text-lg">{testFlowNodes[10].label}</div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="mt-8 grid md:grid-cols-6 gap-3">
          <Card className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700" />
              <div className="text-xs font-bold text-blue-900">Старт</div>
            </div>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700" />
              <div className="text-xs font-bold text-purple-900">Процесс</div>
            </div>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg skew-x-6 bg-gradient-to-br from-cyan-500 to-cyan-700" />
              <div className="text-xs font-bold text-cyan-900">Данные</div>
            </div>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-700" />
              <div className="text-xs font-bold text-yellow-900">Проверка</div>
            </div>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg rotate-45 bg-gradient-to-br from-orange-500 to-orange-700" />
              <div className="text-xs font-bold text-orange-900">Решение</div>
            </div>
          </Card>

          <Card className="p-3 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700" />
              <div className="text-xs font-bold text-green-900">Финиш</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;