import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GameState {
  chapter: number;
  choices: string[];
  ending: string | null;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    chapter: 0,
    choices: [],
    ending: null
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const chapters = [
    {
      title: "Начало",
      text: "Дождь барабанит по крыше заброшенного замка. N стоит у окна, наблюдая за грозой. Рядом с ним маленькая Zorua дрожит от холода. Её красные глаза светятся в темноте.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/1d59bde0-a927-4954-9ef5-9859c1ae34ec.jpg",
      choices: [
        { text: "Погладить Zorua", next: 1 },
        { text: "Выглянуть в окно", next: 2 }
      ]
    },
    {
      title: "Тепло",
      text: "N протягивает руку к Zorua. Покемон вздрагивает, но не убегает. В момент касания, воздух наполняется странным шёпотом. Zorua начинает меняться... но это не эволюция. Что-то не так.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/1fa975f0-aac9-4400-b2b5-c45522b4a062.jpg",
      choices: [
        { text: "Отдёрнуть руку", next: 3 },
        { text: "Продолжить гладить", next: 4 }
      ]
    },
    {
      title: "Тьма за окном",
      text: "За окном только тьма. Нет деревьев, нет неба, нет земли. Только бесконечная пустота, которая смотрит в ответ. Zorua тихо скулит и прячется за N.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/094ca49d-7555-4d4a-9040-515fd44f42a3.jpg",
      choices: [
        { text: "Отойти от окна", next: 1 },
        { text: "Продолжить смотреть", next: 5 }
      ]
    },
    {
      title: "Момент истины",
      text: "N резко отдёргивает руку. Zorua издаёт душераздирающий крик. Её тело начинает растворяться, превращаясь в чёрный дым. 'Почему ты меня бросил?' - эхом раздаётся в голове N.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/cfd0fa05-eeae-48f2-8044-9ceb46984c66.jpg",
      choices: [
        { text: "Попытаться схватить её", next: 6 },
        { text: "Отступить назад", next: 7 }
      ]
    },
    {
      title: "Связь",
      text: "N продолжает гладить Zorua. Шёпот становится громче. Теперь это голоса. Сотни голосов покемонов, которые страдали. Zorua смотрит на N своими красными глазами, и он понимает - она чувствует всю боль мира.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/b74e906c-5ef0-4907-b297-90efd7006f72.jpg",
      choices: [
        { text: "Принять боль вместе", next: 8 },
        { text: "Попытаться разорвать связь", next: 7 }
      ]
    },
    {
      title: "Бездна",
      text: "Пустота начинает затягивать N. Он чувствует, как его сознание растворяется. Zorua пытается его удержать, но её маленькие лапы скользят по полу. Последнее, что видит N - как Zorua падает вместе с ним в бездну.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/529781c4-6ca1-4b25-bf83-7a51835c86b6.jpg",
      choices: [
        { text: "Начать заново", next: 0, ending: "bad" }
      ]
    },
    {
      title: "Иллюзия",
      text: "N успевает схватить дым. В его руках материализуется... но это не Zorua. Это что-то древнее, что только притворялось покемоном. 'Спасибо за освобождение' - говорит оно, прежде чем исчезнуть навсегда.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/14a3a786-d168-4436-bf3a-b6bd59ea414a.jpg",
      choices: [
        { text: "Начать заново", next: 0, ending: "twist" }
      ]
    },
    {
      title: "Одиночество",
      text: "N отступает. Zorua исчезает в тенях. Он остаётся один в пустом замке. Навсегда. Иногда он слышит скуление в темноте, но когда оборачивается - там никого нет.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/10d37e5d-666c-490e-9b98-a967e73072ba.jpg",
      choices: [
        { text: "Начать заново", next: 0, ending: "lonely" }
      ]
    },
    {
      title: "Единство",
      text: "N обнимает Zorua, принимая всю боль. Голоса стихают. В тишине они понимают друг друга. Zorua превращается в чистый свет, окутывая N. Они больше не два существа - они стали чем-то большим. Замок рушится, но им это уже не важно.",
      image: "https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/ee0a8a68-0396-4df1-8d7d-7ce5575182c3.jpg",
      choices: [
        { text: "Начать заново", next: 0, ending: "unity" }
      ]
    }
  ];

  useEffect(() => {
    setIsTransitioning(true);
    setImageLoaded(false);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [gameState.chapter]);

  const handleChoice = (nextChapter: number, ending?: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (ending) {
        setGameState({
          ...gameState,
          chapter: nextChapter,
          ending: ending
        });
      } else {
        setGameState({
          ...gameState,
          chapter: nextChapter,
          choices: [...gameState.choices, chapters[gameState.chapter].title]
        });
      }
    }, 300);
  };

  const currentChapter = chapters[gameState.chapter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl text-primary mb-4 glitch font-bold">
            N & Zorua
          </h1>
          <p className="text-muted-foreground text-lg flicker">
            История о тьме, одиночестве и последнем выборе
          </p>
        </header>

        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="game" className="text-lg">
              <Icon name="Gamepad2" size={20} className="mr-2" />
              Игра
            </TabsTrigger>
            <TabsTrigger value="story" className="text-lg">
              <Icon name="BookOpen" size={20} className="mr-2" />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game">
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <Card className="overflow-hidden border-primary/30 shadow-2xl backdrop-blur-sm bg-card/95">
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent z-10 transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <img 
                    src={currentChapter.image}
                    alt={currentChapter.title}
                    className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    style={{ filter: 'brightness(0.7) contrast(1.1)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                      {currentChapter.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-lg md:text-xl leading-relaxed mb-6 text-foreground/90">
                    {currentChapter.text}
                  </p>

                  {gameState.ending && (
                    <div className="mb-6 p-4 bg-accent/20 border-2 border-accent rounded-lg animate-fade-in shake">
                      <div className="flex items-center space-x-3">
                        <Icon name="Sparkles" size={24} className="text-accent" />
                        <p className="text-accent font-bold text-lg">
                          Концовка: {
                            gameState.ending === 'bad' ? 'Падение в бездну' :
                            gameState.ending === 'twist' ? 'Освобождение' :
                            gameState.ending === 'lonely' ? 'Вечное одиночество' :
                            'Единство душ'
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {currentChapter.choices.map((choice, index) => (
                      <Button
                        key={index}
                        onClick={() => handleChoice(choice.next, choice.ending)}
                        className="w-full justify-start text-left h-auto py-4 px-6 text-base md:text-lg font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
                        variant={choice.ending ? "destructive" : "default"}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <Icon 
                          name={choice.ending ? "RotateCcw" : "ChevronRight"} 
                          size={20} 
                          className="mr-3 flex-shrink-0" 
                        />
                        <span>{choice.text}</span>
                      </Button>
                    ))}
                  </div>

                  {gameState.choices.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon name="Route" size={18} className="text-muted-foreground" />
                        <p className="text-sm text-muted-foreground font-medium">
                          Пройденный путь:
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {gameState.choices.map((choice, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-secondary/80 text-secondary-foreground rounded-full text-xs font-medium border border-secondary-foreground/20 animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {choice}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="story" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="p-6 md:p-8 border-primary/30 shadow-2xl backdrop-blur-sm bg-card/95">
                <div className="mb-6">
                  <div className="relative overflow-hidden rounded-lg mb-6 group">
                    <img 
                      src="https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/e2cf9e6c-ef07-4219-bab0-a87e45bc7e51.jpg"
                      alt="N and Zorua"
                      className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'brightness(0.8) contrast(1.1)' }}
                    />
                  </div>
                  <h2 className="text-3xl md:text-4xl mb-4 text-accent font-bold">
                    Предыстория
                  </h2>
                </div>

                <div className="space-y-6 text-base md:text-lg leading-relaxed">
                  <div className="animate-fade-in">
                    <h3 className="text-2xl md:text-3xl text-primary mb-4 flex items-center font-bold">
                      <Icon name="User" size={28} className="mr-3" />
                      N - Король без королевства
                    </h3>
                    <p className="mb-3">
                      Когда-то N верил, что может изменить мир. Он слышал голоса покемонов, 
                      чувствовал их боль, понимал их желания. Но чем больше он слушал, 
                      тем больше осознавал ужасную правду.
                    </p>
                    <p className="mb-3">
                      Покемоны страдают. Всегда страдали. И всегда будут страдать. 
                      Мир построен на их эксплуатации, и изменить это невозможно.
                    </p>
                    <p className="text-muted-foreground">
                      После поражения от тренеров, N ушёл. Не в путешествие, не на поиски истины. 
                      Он просто... исчез. Замок Team Plasma стал его тюрьмой, где он медленно 
                      терял рассудок, слушая эхо чужой боли.
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-2xl md:text-3xl text-primary mb-4 flex items-center font-bold">
                      <Icon name="Ghost" size={28} className="mr-3" />
                      Zorua - Иллюзия или реальность?
                    </h3>
                    <p className="mb-3">
                      Маленькая Zorua появилась в замке однажды ночью. N не знал откуда. 
                      Она была ранена, напугана, одинока. Он взял её к себе, пытаясь 
                      защитить хотя бы одного покемона.
                    </p>
                    <p className="mb-3">
                      Но Zorua - мастер иллюзий. И чем дольше она оставалась с N, 
                      тем более странными становились её иллюзии. Замок менялся. 
                      Время текло неправильно. Реальность трескалась по швам.
                    </p>
                    <p className="text-muted-foreground">
                      N начал подозревать: а что если Zorua не настоящая? Что если это 
                      последняя иллюзия его разума, цепляющегося за надежду? Или что-то 
                      более зловещее - древняя сущность, принявшая облик покемона?
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <h3 className="text-2xl md:text-3xl text-primary mb-4 flex items-center font-bold">
                      <Icon name="Castle" size={28} className="mr-3" />
                      Замок вне времени
                    </h3>
                    <p className="mb-3">
                      Замок Team Plasma больше не существует в обычном мире. 
                      Он застрял между реальностью и иллюзией, между прошлым и настоящим.
                    </p>
                    <p className="text-destructive font-medium">
                      Здесь N и Zorua обречены проживать один и тот же кошмар снова и снова, 
                      делая выбор, который определит их судьбу. Но каждый выбор ведёт только 
                      к новому витку страданий.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-destructive/10 border-2 border-destructive/40 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '600ms' }}>
                <div className="flex items-start space-x-4">
                  <Icon name="TriangleAlert" size={32} className="text-destructive flex-shrink-0 mt-1 animate-pulse" />
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold mb-3 text-destructive">
                      Предупреждение
                    </h4>
                    <p className="text-sm md:text-base leading-relaxed">
                      Эта история содержит тёмные темы: одиночество, потеря надежды, 
                      психологический хоррор. Некоторые концовки могут быть тревожными. 
                      Игра исследует тёмную сторону вселенной Pokemon через призму отчаяния и безысходности.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
