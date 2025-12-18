import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Layer {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  components: string[];
  color: string;
  bgColor: string;
}

const Index = () => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [activeConnection, setActiveConnection] = useState<string>('all');

  const layers: Layer[] = [
    {
      id: 'client',
      title: 'Клиент',
      subtitle: 'Браузер',
      icon: 'Monitor',
      components: [
        'HTML/CSS',
        'JavaScript (React)',
        'UI компоненты',
        'Формы ввода',
        'Валидация',
        'Роутинг'
      ],
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'server',
      title: 'Сервер',
      subtitle: 'Flask приложение',
      icon: 'Server',
      components: [
        'Routes (/api/*)',
        'Controllers',
        'Business Logic',
        'Authentication',
        'Middleware',
        'ORM (SQLAlchemy)'
      ],
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'database',
      title: 'База данных',
      subtitle: 'SQLite',
      icon: 'Database',
      components: [
        'users',
        'posts',
        'comments',
        'sessions',
        'products',
        'orders'
      ],
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50'
    }
  ];

  const connections = [
    { id: 'http', from: 'client', to: 'server', label: 'HTTP Request', sublabel: 'POST /api/users', data: 'JSON', color: 'text-blue-600' },
    { id: 'response', from: 'server', to: 'client', label: 'HTTP Response', sublabel: '200 OK', data: 'JSON', color: 'text-blue-600' },
    { id: 'query', from: 'server', to: 'database', label: 'SQL Query', sublabel: 'INSERT INTO users', data: 'SQL', color: 'text-purple-600' },
    { id: 'result', from: 'database', to: 'server', label: 'Query Result', sublabel: 'Row ID: 1', data: 'Data', color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Трехзвенная архитектура
          </h1>
          <p className="text-lg text-slate-600">
            Клиент ↔ Сервер ↔ База данных
          </p>
        </div>

        <div className="mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="GitBranch" size={20} className="text-slate-700" />
              <h3 className="text-lg font-bold text-slate-900">Потоки данных</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <button
                onClick={() => setActiveConnection('all')}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  activeConnection === 'all'
                    ? 'border-slate-700 bg-slate-100 scale-105'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-sm font-bold text-slate-900">Все потоки</div>
              </button>
              {connections.map((conn) => (
                <button
                  key={conn.id}
                  onClick={() => setActiveConnection(conn.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    activeConnection === conn.id
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`text-xs font-bold mb-1 ${conn.color}`}>{conn.label}</div>
                  <div className="text-xs text-slate-600 font-mono">{conn.data}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
          {layers.map((layer, index) => {
            const isHovered = hoveredLayer === layer.id;
            const showConnection = activeConnection === 'all' || 
              connections.some(c => 
                (c.id === activeConnection) && 
                (c.from === layer.id || c.to === layer.id)
              );

            return (
              <div key={layer.id} className="relative">
                <Card
                  className={`p-6 bg-gradient-to-br ${layer.color} text-white transition-all duration-300 cursor-pointer ${
                    isHovered ? 'ring-4 ring-yellow-400 scale-105' : showConnection ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Icon name={layer.icon as any} size={28} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{layer.title}</h2>
                      <div className="text-sm text-white/80 font-mono">{layer.subtitle}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {layer.components.map((component, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2 text-sm bg-white/15 px-3 py-2 rounded backdrop-blur-sm hover:bg-white/25 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        <span className="font-mono">{component}</span>
                      </div>
                    ))}
                  </div>

                  {isHovered && (
                    <div className="mt-4 pt-4 border-t border-white/30">
                      <div className="text-xs text-white/90">
                        {layer.id === 'client' && 'Интерфейс пользователя в браузере'}
                        {layer.id === 'server' && 'Обработка запросов и бизнес-логика'}
                        {layer.id === 'database' && 'Хранение данных приложения'}
                      </div>
                    </div>
                  )}
                </Card>

                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="relative">
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="ArrowRight" size={28} className="text-purple-600 animate-pulse" />
                        <div className="text-xs font-bold text-purple-600 bg-white px-2 py-1 rounded shadow">
                          {index === 0 ? 'HTTP' : 'SQL'}
                        </div>
                        <Icon name="ArrowLeft" size={28} className="text-green-600 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {activeConnection !== 'all' && (
          <Card className="p-8 bg-white/90 backdrop-blur-sm mb-8 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {connections
                .filter(c => c.id === activeConnection)
                .map((conn) => (
                  <div key={conn.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="ArrowRight" size={24} className={conn.color} />
                      <div>
                        <h3 className={`text-xl font-bold ${conn.color}`}>{conn.label}</h3>
                        <div className="text-sm text-slate-600 font-mono">{conn.sublabel}</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="text-xs font-bold text-slate-500 mb-2">Пример данных:</div>
                      <pre className="text-sm font-mono text-slate-700">
                        {conn.id === 'http' && `POST /api/users HTTP/1.1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}`}
                        {conn.id === 'response' && `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "John Doe",
  "created_at": "2025-12-18"
}`}
                        {conn.id === 'query' && `INSERT INTO users 
(name, email, created_at)
VALUES 
('John Doe', 'john@example.com', NOW());`}
                        {conn.id === 'result' && `{
  "rowsAffected": 1,
  "insertId": 1,
  "lastId": 1
}`}
                      </pre>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Icon name="Layers" size={24} className="text-white" />
              </div>
              <h4 className="font-bold text-blue-900 text-lg">Разделение слоев</h4>
            </div>
            <p className="text-sm text-blue-700">
              Каждый уровень имеет свою ответственность и может развиваться независимо
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h4 className="font-bold text-purple-900 text-lg">Безопасность</h4>
            </div>
            <p className="text-sm text-purple-700">
              Сервер контролирует доступ к данным, клиент не имеет прямого доступа к БД
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h4 className="font-bold text-green-900 text-lg">Масштабируемость</h4>
            </div>
            <p className="text-sm text-green-700">
              Каждый компонент можно масштабировать горизонтально при росте нагрузки
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;