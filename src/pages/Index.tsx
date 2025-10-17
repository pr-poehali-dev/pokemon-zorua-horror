import { useState } from 'react';
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

  const chapters = [
    {
      title: "Начало",
      text: "Дождь барабанит по крыше заброшенного замка. N стоит у окна, наблюдая за грозой. Рядом с ним маленькая Zorua дрожит от холода. Её красные глаза светятся в темноте.",
      choices: [
        { text: "Погладить Zorua", next: 1 },
        { text: "Выглянуть в окно", next: 2 }
      ]
    },
    {
      title: "Тепло",
      text: "N протягивает руку к Zorua. Покемон вздрагивает, но не убегает. В момент касания, воздух наполняется странным шёпотом. Zorua начинает меняться... но это не эволюция. Что-то не так.",
      choices: [
        { text: "Отдёрнуть руку", next: 3 },
        { text: "Продолжить гладить", next: 4 }
      ]
    },
    {
      title: "Тьма за окном",
      text: "За окном только тьма. Нет деревьев, нет неба, нет земли. Только бесконечная пустота, которая смотрит в ответ. Zorua тихо скулит и прячется за N.",
      choices: [
        { text: "Отойти от окна", next: 1 },
        { text: "Продолжить смотреть", next: 5 }
      ]
    },
    {
      title: "Момент истины",
      text: "N резко отдёргивает руку. Zorua издаёт душераздирающий крик. Её тело начинает растворяться, превращаясь в чёрный дым. 'Почему ты меня бросил?' - эхом раздаётся в голове N.",
      choices: [
        { text: "Попытаться схватить её", next: 6 },
        { text: "Отступить назад", next: 7 }
      ]
    },
    {
      title: "Связь",
      text: "N продолжает гладить Zorua. Шёпот становится громче. Теперь это голоса. Сотни голосов покемонов, которые страдали. Zorua смотрит на N своими красными глазами, и он понимает - она чувствует всю боль мира.",
      choices: [
        { text: "Принять боль вместе", next: 8 },
        { text: "Попытаться разорвать связь", next: 7 }
      ]
    },
    {
      title: "Бездна",
      text: "Пустота начинает затягивать N. Он чувствует, как его сознание растворяется. Zorua пытается его удержать, но её маленькие лапы скользят по полу. Последнее, что видит N - как Zorua падает вместе с ним в бездну.",
      choices: [
        { text: "Начать заново", next: 0, ending: "bad" }
      ]
    },
    {
      title: "Иллюзия",
      text: "N успевает схватить дым. В его руках материализуется... но это не Zorua. Это что-то древнее, что только притворялось покемоном. 'Спасибо за освобождение' - говорит оно, прежде чем исчезнуть навсегда.",
      choices: [
        { text: "Начать заново", next: 0, ending: "twist" }
      ]
    },
    {
      title: "Одиночество",
      text: "N отступает. Zorua исчезает в тенях. Он остаётся один в пустом замке. Навсегда. Иногда он слышит скуление в темноте, но когда оборачивается - там никого нет.",
      choices: [
        { text: "Начать заново", next: 0, ending: "lonely" }
      ]
    },
    {
      title: "Единство",
      text: "N обнимает Zorua, принимая всю боль. Голоса стихают. В тишине они понимают друг друга. Zorua превращается в чистый свет, окутывая N. Они больше не два существа - они стали чем-то большим. Замок рушится, но им это уже не важно.",
      choices: [
        { text: "Начать заново", next: 0, ending: "unity" }
      ]
    }
  ];

  const handleChoice = (nextChapter: number, ending?: string) => {
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
  };

  const currentChapter = chapters[gameState.chapter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl text-primary mb-4 glitch">
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

          <TabsContent value="game" className="animate-fade-in">
            <Card className="p-6 md:p-8 border-primary/30 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-3xl mb-4 text-accent">
                  {currentChapter.title}
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  {currentChapter.text}
                </p>
              </div>

              {gameState.ending && (
                <div className="mb-6 p-4 bg-accent/20 border border-accent rounded-lg">
                  <p className="text-accent font-bold">
                    Концовка: {
                      gameState.ending === 'bad' ? 'Падение в бездну' :
                      gameState.ending === 'twist' ? 'Освобождение' :
                      gameState.ending === 'lonely' ? 'Вечное одиночество' :
                      'Единство душ'
                    }
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {currentChapter.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.next, choice.ending)}
                    className="w-full justify-start text-left h-auto py-4 px-6 hover:scale-105 transition-all"
                    variant={choice.ending ? "destructive" : "default"}
                  >
                    <Icon 
                      name={choice.ending ? "RotateCcw" : "ChevronRight"} 
                      size={20} 
                      className="mr-3 flex-shrink-0" 
                    />
                    <span className="text-base">{choice.text}</span>
                  </Button>
                ))}
              </div>

              {gameState.choices.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Пройденный путь:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {gameState.choices.map((choice, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {choice}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="story" className="animate-fade-in">
            <div className="space-y-6">
              <Card className="p-6 md:p-8 border-primary/30 shadow-2xl">
                <div className="mb-6">
                  <img 
                    src="https://cdn.poehali.dev/projects/9ac703f6-e355-49a0-98af-9b250bdce758/files/e2cf9e6c-ef07-4219-bab0-a87e45bc7e51.jpg"
                    alt="N and Zorua"
                    className="w-full h-64 object-cover rounded-lg mb-6 opacity-80"
                  />
                  <h2 className="text-3xl mb-4 text-accent">
                    Предыстория
                  </h2>
                </div>

                <div className="space-y-6 text-lg leading-relaxed">
                  <div>
                    <h3 className="text-2xl text-primary mb-3 flex items-center">
                      <Icon name="User" size={24} className="mr-2" />
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

                  <div className="border-t border-border pt-6">
                    <h3 className="text-2xl text-primary mb-3 flex items-center">
                      <Icon name="Ghost" size={24} className="mr-2" />
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

                  <div className="border-t border-border pt-6">
                    <h3 className="text-2xl text-primary mb-3 flex items-center">
                      <Icon name="Castle" size={24} className="mr-2" />
                      Замок вне времени
                    </h3>
                    <p className="mb-3">
                      Замок Team Plasma больше не существует в обычном мире. 
                      Он застрял между реальностью и иллюзией, между прошлым и настоящим.
                    </p>
                    <p className="text-destructive">
                      Здесь N и Zorua обречены проживать один и тот же кошмар снова и снова, 
                      делая выбор, который определит их судьбу. Но каждый выбор ведёт только 
                      к новому витку страданий.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-destructive/10 border-destructive/30">
                <div className="flex items-start space-x-3">
                  <Icon name="TriangleAlert" size={24} className="text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-destructive">
                      Предупреждение
                    </h4>
                    <p className="text-sm">
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
