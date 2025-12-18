import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FlowNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'input' | 'output';
  label: string;
  description?: string;
  next?: string[];
  conditions?: string[];
}

const Index = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeExample, setActiveExample] = useState<string>('auth');

  const examples = {
    auth: {
      title: 'Процесс авторизации',
      nodes: [
        { id: 'start', type: 'start', label: 'Начало', next: ['input'] },
        { id: 'input', type: 'input', label: 'Ввод логина и пароля', description: 'Пользователь вводит данные', next: ['validate'] },
        { id: 'validate', type: 'decision', label: 'Данные корректны?', next: ['check', 'error1'], conditions: ['Да', 'Нет'] },
        { id: 'error1', type: 'output', label: 'Ошибка: неверный формат', next: ['input'] },
        { id: 'check', type: 'process', label: 'Проверка в БД', description: 'SELECT * FROM users', next: ['found'] },
        { id: 'found', type: 'decision', label: 'Пользователь найден?', next: ['success', 'error2'], conditions: ['Да', 'Нет'] },
        { id: 'error2', type: 'output', label: 'Ошибка: неверные данные', next: ['input'] },
        { id: 'success', type: 'process', label: 'Создать сессию', description: 'Генерация токена', next: ['end'] },
        { id: 'end', type: 'end', label: 'Успешный вход', next: [] }
      ] as FlowNode[]
    },
    order: {
      title: 'Обработка заказа',
      nodes: [
        { id: 'start', type: 'start', label: 'Начало', next: ['cart'] },
        { id: 'cart', type: 'input', label: 'Добавить товар в корзину', next: ['check_stock'] },
        { id: 'check_stock', type: 'decision', label: 'Товар в наличии?', next: ['calculate', 'out'], conditions: ['Да', 'Нет'] },
        { id: 'out', type: 'output', label: 'Товар отсутствует', next: ['end'] },
        { id: 'calculate', type: 'process', label: 'Рассчитать сумму', description: 'Цена + доставка', next: ['payment'] },
        { id: 'payment', type: 'decision', label: 'Оплата успешна?', next: ['ship', 'fail'], conditions: ['Да', 'Нет'] },
        { id: 'fail', type: 'output', label: 'Ошибка оплаты', next: ['end'] },
        { id: 'ship', type: 'process', label: 'Отправить заказ', description: 'Создать накладную', next: ['notify'] },
        { id: 'notify', type: 'output', label: 'Уведомить клиента', next: ['end'] },
        { id: 'end', type: 'end', label: 'Завершено', next: [] }
      ] as FlowNode[]
    },
    search: {
      title: 'Поиск в базе данных',
      nodes: [
        { id: 'start', type: 'start', label: 'Начало', next: ['input'] },
        { id: 'input', type: 'input', label: 'Ввести запрос', next: ['check'] },
        { id: 'check', type: 'decision', label: 'Запрос не пустой?', next: ['search', 'error'], conditions: ['Да', 'Нет'] },
        { id: 'error', type: 'output', label: 'Введите запрос', next: ['input'] },
        { id: 'search', type: 'process', label: 'Поиск в БД', description: 'SELECT * WHERE name LIKE', next: ['found'] },
        { id: 'found', type: 'decision', label: 'Найдены результаты?', next: ['show', 'empty'], conditions: ['Да', 'Нет'] },
        { id: 'empty', type: 'output', label: 'Ничего не найдено', next: ['end'] },
        { id: 'show', type: 'output', label: 'Показать результаты', next: ['end'] },
        { id: 'end', type: 'end', label: 'Конец', next: [] }
      ] as FlowNode[]
    }
  };

  const currentExample = examples[activeExample as keyof typeof examples];

  const getNodeStyle = (type: string) => {
    switch (type) {
      case 'start':
      case 'end':
        return {
          shape: 'rounded-full',
          color: 'from-green-400 to-green-600',
          icon: type === 'start' ? 'Play' : 'CheckCircle'
        };
      case 'process':
        return {
          shape: 'rounded-lg',
          color: 'from-blue-400 to-blue-600',
          icon: 'Settings'
        };
      case 'decision':
        return {
          shape: 'rotate-45',
          color: 'from-yellow-400 to-yellow-600',
          icon: 'HelpCircle'
        };
      case 'input':
        return {
          shape: 'rounded-lg skew-x-12',
          color: 'from-purple-400 to-purple-600',
          icon: 'Edit'
        };
      case 'output':
        return {
          shape: 'rounded-lg -skew-x-12',
          color: 'from-orange-400 to-orange-600',
          icon: 'FileOutput'
        };
      default:
        return {
          shape: 'rounded-lg',
          color: 'from-gray-400 to-gray-600',
          icon: 'Box'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Интерактивная блок-схема
          </h1>
          <p className="text-lg text-slate-600">
            Визуализация алгоритмов и процессов
          </p>
        </div>

        <div className="mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Workflow" size={20} className="text-slate-700" />
              <h3 className="text-lg font-bold text-slate-900">Выберите пример</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(examples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => setActiveExample(key)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    activeExample === key
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon 
                      name={key === 'auth' ? 'Lock' : key === 'order' ? 'ShoppingCart' : 'Search'} 
                      size={20} 
                      className={activeExample === key ? 'text-purple-600' : 'text-slate-600'}
                    />
                    <span className="font-bold text-slate-900">{example.title}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {example.nodes.length} шагов
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            {currentExample.title}
          </h2>

          <div className="space-y-6 max-w-2xl mx-auto">
            {currentExample.nodes.map((node, index) => {
              const style = getNodeStyle(node.type);
              const isHovered = hoveredNode === node.id;
              const isDecision = node.type === 'decision';

              return (
                <div key={node.id} className="relative">
                  <div
                    className={`relative transition-all duration-300 ${
                      isHovered ? 'scale-105 z-10' : ''
                    }`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`relative bg-gradient-to-br ${style.color} p-6 ${
                        isDecision ? style.shape + ' p-8' : style.shape
                      } text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                    >
                      {isDecision && (
                        <div className="-rotate-45 flex flex-col items-center justify-center h-full">
                          <Icon name={style.icon as any} size={24} className="mb-2" />
                          <div className="text-center font-bold text-sm">{node.label}</div>
                        </div>
                      )}
                      
                      {!isDecision && (
                        <div className="flex items-center gap-3">
                          <Icon name={style.icon as any} size={28} />
                          <div className="flex-1">
                            <div className="font-bold text-lg">{node.label}</div>
                            {node.description && (
                              <div className="text-xs text-white/80 mt-1 font-mono">
                                {node.description}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {isHovered && node.description && isDecision && (
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded shadow-lg whitespace-nowrap text-sm animate-fade-in z-20">
                          {node.description}
                        </div>
                      )}
                    </div>

                    <div className="absolute -top-3 -left-3 bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {node.next && node.next.length > 0 && (
                    <div className="flex justify-center py-4">
                      {node.next.length === 1 ? (
                        <Icon name="ArrowDown" size={32} className="text-slate-400 animate-bounce" />
                      ) : (
                        <div className="flex gap-8 items-center w-full justify-center">
                          <div className="flex flex-col items-center flex-1">
                            <div className="text-xs font-bold text-green-600 mb-2 bg-green-50 px-2 py-1 rounded">
                              {node.conditions?.[0] || 'Да'}
                            </div>
                            <Icon name="ArrowDown" size={28} className="text-green-500" />
                          </div>
                          <div className="flex flex-col items-center flex-1">
                            <div className="text-xs font-bold text-red-600 mb-2 bg-red-50 px-2 py-1 rounded">
                              {node.conditions?.[1] || 'Нет'}
                            </div>
                            <Icon name="ArrowDown" size={28} className="text-red-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid md:grid-cols-5 gap-4">
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
              <div>
                <div className="font-bold text-green-900 text-sm">Начало/Конец</div>
                <div className="text-xs text-green-700">Старт и финиш</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600" />
              <div>
                <div className="font-bold text-blue-900 text-sm">Процесс</div>
                <div className="text-xs text-blue-700">Действие</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rotate-45 bg-gradient-to-br from-yellow-400 to-yellow-600" />
              <div>
                <div className="font-bold text-yellow-900 text-sm">Решение</div>
                <div className="text-xs text-yellow-700">Условие</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-lg skew-x-12 bg-gradient-to-br from-purple-400 to-purple-600" />
              <div>
                <div className="font-bold text-purple-900 text-sm">Ввод</div>
                <div className="text-xs text-purple-700">Данные</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-lg -skew-x-12 bg-gradient-to-br from-orange-400 to-orange-600" />
              <div>
                <div className="font-bold text-orange-900 text-sm">Вывод</div>
                <div className="text-xs text-orange-700">Результат</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;