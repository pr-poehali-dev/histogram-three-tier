import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DataSet {
  id: string;
  label: string;
  data: { label: string; value: number; color: string }[];
  unit: string;
}

const Index = () => {
  const [activeDataSet, setActiveDataSet] = useState<string>('sales');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const dataSets: DataSet[] = [
    {
      id: 'sales',
      label: 'Продажи по месяцам',
      unit: 'млн ₽',
      data: [
        { label: 'Янв', value: 45, color: 'from-purple-400 to-purple-600' },
        { label: 'Фев', value: 52, color: 'from-purple-400 to-purple-600' },
        { label: 'Мар', value: 48, color: 'from-purple-400 to-purple-600' },
        { label: 'Апр', value: 67, color: 'from-purple-400 to-purple-600' },
        { label: 'Май', value: 73, color: 'from-purple-400 to-purple-600' },
        { label: 'Июн', value: 81, color: 'from-purple-400 to-purple-600' },
        { label: 'Июл', value: 88, color: 'from-purple-400 to-purple-600' },
        { label: 'Авг', value: 75, color: 'from-purple-400 to-purple-600' },
      ]
    },
    {
      id: 'users',
      label: 'Активные пользователи',
      unit: 'тыс. чел',
      data: [
        { label: 'Пн', value: 12, color: 'from-blue-400 to-blue-600' },
        { label: 'Вт', value: 15, color: 'from-blue-400 to-blue-600' },
        { label: 'Ср', value: 18, color: 'from-blue-400 to-blue-600' },
        { label: 'Чт', value: 22, color: 'from-blue-400 to-blue-600' },
        { label: 'Пт', value: 28, color: 'from-blue-400 to-blue-600' },
        { label: 'Сб', value: 25, color: 'from-blue-400 to-blue-600' },
        { label: 'Вс', value: 20, color: 'from-blue-400 to-blue-600' },
      ]
    },
    {
      id: 'performance',
      label: 'Производительность серверов',
      unit: '%',
      data: [
        { label: 'Server 1', value: 85, color: 'from-green-400 to-green-600' },
        { label: 'Server 2', value: 92, color: 'from-green-400 to-green-600' },
        { label: 'Server 3', value: 78, color: 'from-green-400 to-green-600' },
        { label: 'Server 4', value: 88, color: 'from-green-400 to-green-600' },
        { label: 'Server 5', value: 95, color: 'from-green-400 to-green-600' },
      ]
    }
  ];

  const currentData = dataSets.find(ds => ds.id === activeDataSet) || dataSets[0];
  const maxValue = Math.max(...currentData.data.map(d => d.value));
  const avgValue = currentData.data.reduce((sum, d) => sum + d.value, 0) / currentData.data.length;
  const totalValue = currentData.data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Интерактивная гистограмма
          </h1>
          <p className="text-lg text-slate-600">
            Визуализация данных в реальном времени
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {dataSets.map((dataset) => (
            <button
              key={dataset.id}
              onClick={() => setActiveDataSet(dataset.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                activeDataSet === dataset.id
                  ? 'border-purple-500 bg-purple-50 scale-105 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon 
                  name={dataset.id === 'sales' ? 'TrendingUp' : dataset.id === 'users' ? 'Users' : 'Activity'} 
                  size={20} 
                  className={activeDataSet === dataset.id ? 'text-purple-600' : 'text-slate-600'}
                />
                <span className="font-bold text-slate-900">{dataset.label}</span>
              </div>
              <div className="text-sm text-slate-500 font-mono">
                {dataset.data.length} точек данных
              </div>
            </button>
          ))}
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{currentData.label}</h2>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-sm text-slate-500">Среднее</div>
                <div className="text-xl font-bold text-slate-900">
                  {avgValue.toFixed(1)} {currentData.unit}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Максимум</div>
                <div className="text-xl font-bold text-purple-600">
                  {maxValue} {currentData.unit}
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-96 bg-slate-50 rounded-lg p-6">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-300" />
            <div className="absolute left-6 right-6 bottom-6 h-px bg-slate-300" />

            <div className="absolute left-2 top-6 bottom-6 flex flex-col justify-between text-xs text-slate-500 font-mono">
              {[100, 75, 50, 25, 0].map((percent) => (
                <div key={percent} className="flex items-center">
                  <span>{Math.round((maxValue * percent) / 100)}</span>
                </div>
              ))}
            </div>

            <div className="absolute left-12 right-6 top-6 bottom-12 flex items-end justify-around gap-2">
              {currentData.data.map((item, index) => {
                const heightPercent = (item.value / maxValue) * 100;
                const isHovered = hoveredBar === index;
                
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center relative"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <div
                      className={`w-full bg-gradient-to-t ${item.color} rounded-t-lg transition-all duration-500 cursor-pointer relative ${
                        isHovered ? 'opacity-100 scale-105' : 'opacity-90'
                      }`}
                      style={{
                        height: `${heightPercent}%`,
                        animationDelay: `${index * 0.1}s`,
                        animation: 'slideUp 0.6s ease-out forwards'
                      }}
                    >
                      {isHovered && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded shadow-lg whitespace-nowrap animate-fade-in z-10">
                          <div className="text-xs font-mono">{item.label}</div>
                          <div className="text-sm font-bold">{item.value} {currentData.unit}</div>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 font-mono mt-2 whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Icon name="Info" size={16} />
            <span>Наведите курсор на столбец для подробной информации</span>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Icon name="BarChart3" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-purple-600 font-medium">Всего</div>
                <div className="text-2xl font-bold text-purple-900">
                  {totalValue.toFixed(0)}
                </div>
              </div>
            </div>
            <div className="text-xs text-purple-700">
              Общая сумма всех значений
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Icon name="TrendingUp" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-blue-600 font-medium">Среднее</div>
                <div className="text-2xl font-bold text-blue-900">
                  {avgValue.toFixed(1)}
                </div>
              </div>
            </div>
            <div className="text-xs text-blue-700">
              Среднее арифметическое значение
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Icon name="Target" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-green-600 font-medium">Точек</div>
                <div className="text-2xl font-bold text-green-900">
                  {currentData.data.length}
                </div>
              </div>
            </div>
            <div className="text-xs text-green-700">
              Количество элементов данных
            </div>
          </Card>
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              height: 0;
              opacity: 0;
            }
            to {
              height: var(--target-height);
              opacity: 0.9;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Index;