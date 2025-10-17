import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameObject {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  action?: string;
  clickable: boolean;
  revealed?: boolean;
}

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Location {
  id: string;
  name: string;
  background: string;
  objects: GameObject[];
  description: string;
  ambiance: string;
}

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('room');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [gameLog, setGameLog] = useState<string[]>(['Ты просыпаешься в тёмной комнате замка...']);
  const [discoveredObjects, setDiscoveredObjects] = useState<Set<string>>(new Set());
  const [zoruaPosition, setZoruaPosition] = useState({ x: 20, y: 60 });
  const [showInventory, setShowInventory] = useState(false);

  const locations: Record<string, Location> = {
    room: {
      id: 'room',
      name: 'Комната N',
      background: 'linear-gradient(180deg, #1a1520 0%, #2d2438 100%)',
      description: 'Тёмная комната с видом на грозу. Дождь барабанит по окнам.',
      ambiance: 'Слышен стук дождя и раскаты грома',
      objects: [
        {
          id: 'window',
          name: 'Окно',
          x: 70,
          y: 15,
          width: 20,
          height: 30,
          description: 'За окном только тьма и молнии',
          clickable: true,
          action: 'examine'
        },
        {
          id: 'table',
          name: 'Стол',
          x: 15,
          y: 70,
          width: 15,
          height: 12,
          description: 'Старый деревянный стол',
          clickable: true,
          action: 'examine'
        },
        {
          id: 'diary',
          name: 'Дневник',
          x: 18,
          y: 68,
          width: 8,
          height: 6,
          description: 'Потрёпанный дневник с записями',
          clickable: true,
          action: 'take',
          revealed: false
        },
        {
          id: 'door',
          name: 'Дверь',
          x: 85,
          y: 30,
          width: 12,
          height: 35,
          description: 'Массивная дверь ведёт в коридор',
          clickable: true,
          action: 'use'
        }
      ]
    },
    corridor: {
      id: 'corridor',
      name: 'Коридор',
      background: 'linear-gradient(180deg, #0f0a15 0%, #1a1520 100%)',
      description: 'Бесконечный коридор замка. Факелы мерцают на стенах.',
      ambiance: 'Эхо твоих шагов отдаётся в темноте',
      objects: [
        {
          id: 'portrait',
          name: 'Портрет',
          x: 25,
          y: 20,
          width: 15,
          height: 25,
          description: 'Старый портрет. Глаза на картине следят за тобой.',
          clickable: true,
          action: 'examine'
        },
        {
          id: 'key',
          name: 'Ключ',
          x: 60,
          y: 75,
          width: 5,
          height: 5,
          description: 'Ржавый ключ лежит на полу',
          clickable: true,
          action: 'take',
          revealed: false
        },
        {
          id: 'locked_door',
          name: 'Запертая дверь',
          x: 75,
          y: 25,
          width: 18,
          height: 40,
          description: 'Дверь заперта. Нужен ключ.',
          clickable: true,
          action: 'use'
        },
        {
          id: 'back_door',
          name: 'Назад',
          x: 5,
          y: 30,
          width: 10,
          height: 35,
          description: 'Вернуться в комнату',
          clickable: true,
          action: 'use'
        }
      ]
    },
    throne: {
      id: 'throne',
      name: 'Тронный зал',
      background: 'linear-gradient(180deg, #2d1f3d 0%, #1a0f2e 100%)',
      description: 'Огромный зал с пустым троном. Здесь что-то не так...',
      ambiance: 'Тишина давит на уши. Воздух тяжёлый.',
      objects: [
        {
          id: 'throne',
          name: 'Трон',
          x: 40,
          y: 35,
          width: 20,
          height: 30,
          description: 'Пустой трон Team Plasma. На нём лежит что-то...',
          clickable: true,
          action: 'examine'
        },
        {
          id: 'crystal',
          name: 'Кристалл',
          x: 48,
          y: 42,
          width: 4,
          height: 6,
          description: 'Тёмный кристалл пульсирует',
          clickable: true,
          action: 'take',
          revealed: false
        }
      ]
    }
  };

  const addLog = (message: string) => {
    setGameLog(prev => [...prev.slice(-4), message]);
  };

  const handleObjectClick = (obj: GameObject) => {
    if (!obj.clickable) return;

    const location = locations[currentLocation];

    if (obj.action === 'examine') {
      if (obj.id === 'window') {
        addLog('За окном абсолютная тьма. Нет ни звёзд, ни земли. Только пустота.');
      } else if (obj.id === 'table') {
        addLog('На столе лежит потрёпанный дневник.');
        setDiscoveredObjects(prev => new Set([...prev, 'diary']));
      } else if (obj.id === 'portrait') {
        addLog('Портрет изображает древнего короля. Его глаза... они движутся.');
        setDiscoveredObjects(prev => new Set([...prev, 'key']));
      } else if (obj.id === 'throne') {
        addLog('На троне лежит странный кристалл. Он притягивает взгляд.');
        setDiscoveredObjects(prev => new Set([...prev, 'crystal']));
      } else {
        addLog(obj.description);
      }
    } else if (obj.action === 'take') {
      if (obj.id === 'diary') {
        addLog('Ты взял дневник. В нём записи о страданиях покемонов.');
        setInventory(prev => [...prev, {
          id: 'diary',
          name: 'Дневник N',
          description: 'Исписанный дневник с мрачными мыслями',
          icon: 'BookOpen'
        }]);
      } else if (obj.id === 'key') {
        addLog('Ты поднял ржавый ключ. Он холодный, как лёд.');
        setInventory(prev => [...prev, {
          id: 'key',
          name: 'Ржавый ключ',
          description: 'Старый ключ от неизвестной двери',
          icon: 'Key'
        }]);
      } else if (obj.id === 'crystal') {
        addLog('Кристалл обжигает руку, но ты забираешь его.');
        setInventory(prev => [...prev, {
          id: 'crystal',
          name: 'Тёмный кристалл',
          description: 'Пульсирующий кристалл тёмной энергии',
          icon: 'Gem'
        }]);
      }
    } else if (obj.action === 'use') {
      if (obj.id === 'door') {
        addLog('Ты открываешь дверь в коридор.');
        setCurrentLocation('corridor');
      } else if (obj.id === 'back_door') {
        addLog('Ты возвращаешься в комнату.');
        setCurrentLocation('room');
      } else if (obj.id === 'locked_door') {
        if (inventory.find(item => item.id === 'key')) {
          addLog('Ключ подходит! Дверь открывается со скрипом.');
          setCurrentLocation('throne');
        } else {
          addLog('Дверь заперта. Нужен ключ.');
        }
      }
    }
  };

  const handleZoruaClick = () => {
    const messages = [
      'Zorua смотрит на тебя своими красными глазами.',
      'Она скулит, будто пытается что-то сказать.',
      'Zorua дрожит. Ей страшно.',
      'Ты гладишь Zorua. Она немного успокаивается.'
    ];
    addLog(messages[Math.floor(Math.random() * messages.length)]);
  };

  const currentLoc = locations[currentLocation];

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl text-primary mb-2 font-bold glitch">
            N & Zorua: Замок иллюзий
          </h1>
          <p className="text-muted-foreground flicker text-sm">
            {currentLoc.ambiance}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <Card className="relative overflow-hidden border-primary/30 shadow-2xl" 
                  style={{ background: currentLoc.background, minHeight: '500px' }}>
              <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white">{currentLoc.name}</h2>
                <p className="text-sm text-gray-300">{currentLoc.description}</p>
              </div>

              <div className="absolute inset-0" style={{ cursor: 'crosshair' }}>
                {currentLoc.objects.map(obj => {
                  const isVisible = !obj.revealed || discoveredObjects.has(obj.id);
                  if (!isVisible) return null;

                  return (
                    <div
                      key={obj.id}
                      onClick={() => handleObjectClick(obj)}
                      className="absolute transition-all hover:scale-110 hover:brightness-125 cursor-pointer"
                      style={{
                        left: `${obj.x}%`,
                        top: `${obj.y}%`,
                        width: `${obj.width}%`,
                        height: `${obj.height}%`,
                        border: '2px solid rgba(234, 56, 76, 0.3)',
                        borderRadius: '8px',
                        background: 'rgba(234, 56, 76, 0.1)',
                        backdropFilter: 'blur(2px)'
                      }}
                      title={obj.name}
                    />
                  );
                })}

                <div
                  className="absolute transition-all duration-500 cursor-pointer hover:scale-110"
                  style={{
                    left: `${zoruaPosition.x}%`,
                    top: `${zoruaPosition.y}%`,
                    width: '80px',
                    height: '80px'
                  }}
                  onClick={handleZoruaClick}
                >
                  <img 
                    src="https://cdn.poehali.dev/files/eb7a2be1-38d5-4439-a7e2-fcae72fa531a.png"
                    alt="Zorua"
                    className="w-full h-full object-contain drop-shadow-lg animate-pulse"
                  />
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <img 
                  src="https://cdn.poehali.dev/files/76cb79cf-1086-4e14-af67-74ce1e2d2339.png"
                  alt="N"
                  className="w-32 h-auto drop-shadow-2xl opacity-80"
                />
              </div>
            </Card>

            <Card className="mt-4 p-4 border-accent/30 bg-card/80 backdrop-blur-sm">
              <div className="flex items-start space-x-2 mb-2">
                <Icon name="MessageSquare" size={20} className="text-accent mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-accent mb-2">Действия</h3>
                  <div className="space-y-1">
                    {gameLog.map((log, index) => (
                      <p 
                        key={index} 
                        className="text-sm text-foreground/80 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        › {log}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-4 border-secondary/30 bg-card/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-secondary flex items-center">
                  <Icon name="Backpack" size={20} className="mr-2" />
                  Инвентарь
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInventory(!showInventory)}
                >
                  <Icon name={showInventory ? "ChevronUp" : "ChevronDown"} size={18} />
                </Button>
              </div>

              {showInventory && (
                <div className="space-y-2 animate-fade-in">
                  {inventory.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">Пусто</p>
                  ) : (
                    inventory.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                          selectedItem === item.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name={item.icon as any} size={24} className="text-primary" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </Card>

            <Card className="p-4 border-destructive/30 bg-card/95 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-destructive mb-3 flex items-center">
                <Icon name="Map" size={20} className="mr-2" />
                Управление
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Icon name="MousePointer" size={16} className="text-primary mt-0.5" />
                  <span>Нажимай на объекты для взаимодействия</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Eye" size={16} className="text-accent mt-0.5" />
                  <span>Исследуй локации внимательно</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Package" size={16} className="text-secondary mt-0.5" />
                  <span>Используй предметы из инвентаря</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Ghost" size={16} className="text-destructive mt-0.5" />
                  <span>Общайся с Zorua</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={18} className="text-accent" />
                <h3 className="text-sm font-bold text-accent">Статус</h3>
              </div>
              <div className="space-y-1 text-xs">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Локация:</span>
                  <span className="text-foreground font-medium">{currentLoc.name}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Предметов:</span>
                  <span className="text-foreground font-medium">{inventory.length}/10</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Найдено:</span>
                  <span className="text-foreground font-medium">{discoveredObjects.size} объектов</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
