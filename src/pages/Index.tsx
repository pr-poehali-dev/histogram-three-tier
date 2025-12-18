import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Component {
  id: string;
  title: string;
  items: string[];
  color: string;
}

const Index = () => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [activeFlow, setActiveFlow] = useState<string>('http');

  const layers: Component[] = [
    {
      id: 'browser',
      title: 'Браузер (Client)',
      items: ['HTML/CSS', 'JavaScript', 'UI компоненты', 'Формы ввода'],
      color: 'from-slate-700 to-slate-800'
    },
    {
      id: 'server',
      title: 'Flask App (Server)',
      items: ['Routes', 'Controllers', 'Business Logic', 'Auth'],
      color: 'from-slate-800 to-slate-900'
    },
    {
      id: 'database',
      title: 'SQLite (Database)',
      items: ['users', 'posts', 'comments', 'sessions'],
      color: 'from-slate-900 to-black'
    }
  ];

  const flows = [
    { id: 'http', label: 'HTTP Request/Response', type: 'JSON', color: 'bg-purple-500' },
    { id: 'orm', label: 'ORM Layer', type: 'Python Objects', color: 'bg-blue-500' },
    { id: 'sql', label: 'SQL Queries', type: 'SQL', color: 'bg-green-500' }
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

        <div className="grid md:grid-cols-3 gap-6 mb-12 relative">
          {layers.map((layer, index) => (
            <div key={layer.id} className="relative">
              <Card
                className={`p-6 bg-gradient-to-br ${layer.color} text-white transition-all duration-300 hover:scale-105 cursor-pointer ${
                  hoveredLayer === layer.id ? 'ring-4 ring-purple-400' : ''
                }`}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon 
                    name={index === 0 ? 'Monitor' : index === 1 ? 'Server' : 'Database'} 
                    size={32} 
                    className="text-white"
                  />
                  <h2 className="text-xl font-bold">{layer.title}</h2>
                </div>
                
                <div className="space-y-2">
                  {layer.items.map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded backdrop-blur-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <span className="font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="relative">
                    <Icon name="ArrowRight" size={24} className="text-purple-500 animate-pulse" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-mono bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {index === 0 ? 'HTTP' : 'SQL'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Icon name="GitBranch" size={24} />
            Потоки данных
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {flows.map((flow) => (
              <button
                key={flow.id}
                onClick={() => setActiveFlow(flow.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  activeFlow === flow.id
                    ? 'border-purple-500 bg-purple-50 scale-105'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${flow.color}`} />
                  <span className="font-bold text-slate-900">{flow.label}</span>
                </div>
                <div className="text-sm text-slate-600 font-mono">
                  Тип: {flow.type}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            {activeFlow === 'http' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Icon name="ArrowRightLeft" size={20} />
                  HTTP Request/Response
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-slate-200">
                    <div className="text-sm font-bold text-purple-600 mb-2">Request →</div>
                    <pre className="text-xs font-mono text-slate-700">
{`{
  "method": "POST",
  "endpoint": "/api/users",
  "body": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}
                    </pre>
                  </div>
                  <div className="bg-white p-4 rounded border border-slate-200">
                    <div className="text-sm font-bold text-green-600 mb-2">← Response</div>
                    <pre className="text-xs font-mono text-slate-700">
{`{
  "status": 201,
  "data": {
    "id": 1,
    "name": "John Doe",
    "created_at": "2025-12-18"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeFlow === 'orm' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Icon name="Layers" size={20} />
                  ORM Layer (Python Objects)
                </h4>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <pre className="text-sm font-mono text-slate-700">
{`from flask_sqlalchemy import SQLAlchemy

# Создание объекта
user = User(
    name="John Doe",
    email="john@example.com"
)

# Сохранение в БД
db.session.add(user)
db.session.commit()`}
                  </pre>
                </div>
              </div>
            )}

            {activeFlow === 'sql' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Icon name="Database" size={20} />
                  SQL Queries
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-slate-200">
                    <div className="text-sm font-bold text-blue-600 mb-2">INSERT</div>
                    <pre className="text-xs font-mono text-slate-700">
{`INSERT INTO users 
(name, email, created_at)
VALUES 
('John Doe', 
 'john@example.com',
 '2025-12-18');`}
                    </pre>
                  </div>
                  <div className="bg-white p-4 rounded border border-slate-200">
                    <div className="text-sm font-bold text-green-600 mb-2">SELECT</div>
                    <pre className="text-xs font-mono text-slate-700">
{`SELECT id, name, email
FROM users
WHERE id = 1
LIMIT 1;

-- Result: 1 row`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Zap" size={20} className="text-purple-600" />
              <h4 className="font-bold text-purple-900">Быстро</h4>
            </div>
            <p className="text-sm text-purple-700">
              Минимальная задержка между компонентами
            </p>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Shield" size={20} className="text-blue-600" />
              <h4 className="font-bold text-blue-900">Безопасно</h4>
            </div>
            <p className="text-sm text-blue-700">
              Изоляция слоев для защиты данных
            </p>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Boxes" size={20} className="text-green-600" />
              <h4 className="font-bold text-green-900">Модульно</h4>
            </div>
            <p className="text-sm text-green-700">
              Каждый компонент можно обновлять отдельно
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;