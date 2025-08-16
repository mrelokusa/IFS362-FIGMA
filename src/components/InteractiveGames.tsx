import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  Activity, 
  Award,
  Timer,
  CheckCircle,
  X,
  Shuffle
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function InteractiveGames() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
              Interactive Learning
            </Badge>
            <h2 className="mb-6">Educational Games & Simulators</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Learn about hypertension through fun, interactive games and simulations that help you understand blood pressure management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <BloodPressureSimulator />
            <LifestyleChoiceGame />
          </div>
          
          <div className="mt-8">
            <MemoryMatchingGame />
          </div>
        </div>
      </div>
    </section>
  );
}

function BloodPressureSimulator() {
  const [systolic, setSystolic] = useState([120]);
  const [diastolic, setDiastolic] = useState([80]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [heartRate, setHeartRate] = useState(72);

  const getBPCategory = () => {
    const sys = systolic[0];
    const dia = diastolic[0];
    
    if (sys < 120 && dia < 80) return { category: "Normal", color: "text-green-600", bg: "bg-green-50" };
    if (sys < 130 && dia < 80) return { category: "Elevated", color: "text-yellow-600", bg: "bg-yellow-50" };
    if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return { category: "Stage 1 High", color: "text-orange-600", bg: "bg-orange-50" };
    if (sys >= 140 || dia >= 90) return { category: "Stage 2 High", color: "text-red-600", bg: "bg-red-50" };
    return { category: "Crisis", color: "text-red-800", bg: "bg-red-100" };
  };

  const category = getBPCategory();

  const getFactors = () => {
    const factors = [];
    if (systolic[0] > 130) factors.push("High systolic pressure increases stroke risk");
    if (diastolic[0] > 80) factors.push("High diastolic pressure affects heart workload");
    if (systolic[0] < 100) factors.push("Low blood pressure may cause dizziness");
    return factors;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-blue-600" />
          <CardTitle>Blood Pressure Simulator</CardTitle>
        </div>
        <p className="text-gray-600">Adjust the sliders to see how different blood pressure readings are categorized.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* BP Display */}
        <div className={`text-center p-6 rounded-xl ${category.bg} border`}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className={`w-8 h-8 ${category.color} ${isAnimated ? 'animate-pulse' : ''}`} />
            <div className="text-3xl font-bold text-gray-900">
              {systolic[0]}/{diastolic[0]}
            </div>
          </div>
          <Badge className={`${category.color} bg-transparent`}>
            {category.category}
          </Badge>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Systolic Pressure</label>
              <span className="text-sm text-gray-600">{systolic[0]} mmHg</span>
            </div>
            <Slider
              value={systolic}
              onValueChange={setSystolic}
              max={200}
              min={80}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Diastolic Pressure</label>
              <span className="text-sm text-gray-600">{diastolic[0]} mmHg</span>
            </div>
            <Slider
              value={diastolic}
              onValueChange={setDiastolic}
              max={120}
              min={40}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Information */}
        <div className="space-y-3">
          <h4>What this means:</h4>
          {getFactors().length > 0 ? (
            <ul className="space-y-1">
              {getFactors().map((factor, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-600">✓ This is a healthy blood pressure reading</p>
          )}
        </div>

        <Button 
          onClick={() => {
            setSystolic([120]);
            setDiastolic([80]);
            toast.success("Reset to normal blood pressure");
          }}
          variant="outline" 
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Normal
        </Button>
      </CardContent>
    </Card>
  );
}

function LifestyleChoiceGame() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      situation: "You're at a restaurant looking at the menu. What do you choose?",
      choices: [
        { text: "Grilled salmon with vegetables", points: 3, feedback: "Excellent! Omega-3 rich fish and vegetables are heart-healthy." },
        { text: "Caesar salad with grilled chicken", points: 2, feedback: "Good choice, but watch the sodium in the dressing." },
        { text: "Bacon cheeseburger with fries", points: 0, feedback: "High in sodium and saturated fat - not ideal for blood pressure." },
        { text: "Vegetable stir-fry with brown rice", points: 3, feedback: "Perfect! Low sodium, high fiber, and nutrient-rich." }
      ]
    },
    {
      situation: "It's been a stressful day at work. How do you unwind?",
      choices: [
        { text: "Go for a 30-minute walk", points: 3, feedback: "Excellent! Exercise is one of the best stress relievers." },
        { text: "Watch TV with a bag of chips", points: 0, feedback: "This adds sodium and doesn't address stress effectively." },
        { text: "Practice deep breathing exercises", points: 3, feedback: "Great choice! Meditation reduces stress and blood pressure." },
        { text: "Have a couple of drinks", points: 1, feedback: "Moderate alcohol might relax you, but it's not the healthiest option." }
      ]
    },
    {
      situation: "Your doctor recommends checking your blood pressure at home. What do you do?",
      choices: [
        { text: "Buy a reliable home monitor and track daily", points: 3, feedback: "Perfect! Regular monitoring helps detect changes early." },
        { text: "Check it occasionally at the pharmacy", points: 1, feedback: "Some monitoring is good, but consistency is important." },
        { text: "Wait until your next doctor's appointment", points: 0, feedback: "Regular monitoring between visits is crucial for management." },
        { text: "Use a smartphone app to estimate", points: 0, feedback: "Smartphone apps aren't accurate for blood pressure measurement." }
      ]
    },
    {
      situation: "You're grocery shopping. Which snack do you put in your cart?",
      choices: [
        { text: "Salted nuts", points: 1, feedback: "Nuts are healthy, but choose unsalted versions to reduce sodium." },
        { text: "Fresh fruit", points: 3, feedback: "Excellent! Potassium-rich fruits help regulate blood pressure." },
        { text: "Potato chips", points: 0, feedback: "High in sodium - not good for blood pressure management." },
        { text: "Dark chocolate (70% cacao)", points: 2, feedback: "Good choice! Dark chocolate may have heart benefits in moderation." }
      ]
    },
    {
      situation: "You have 30 minutes of free time. What's your activity choice?",
      choices: [
        { text: "Take a power nap", points: 1, feedback: "Rest is important, but regular exercise provides more BP benefits." },
        { text: "Do some gardening or housework", points: 2, feedback: "Good! Light physical activity helps with blood pressure." },
        { text: "Go for a bike ride", points: 3, feedback: "Excellent! Cardio exercise is one of the best ways to lower BP." },
        { text: "Play video games", points: 0, feedback: "Sedentary activities don't help with blood pressure management." }
      ]
    }
  ];

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowFeedback(true);
    
    const points = scenarios[currentScenario].choices[choiceIndex].points;
    setScore(score + points);
    
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setSelectedChoice(null);
        setShowFeedback(false);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setGameComplete(false);
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const getScoreMessage = () => {
    const maxScore = scenarios.length * 3;
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) return { message: "Excellent lifestyle choices!", color: "text-green-600" };
    if (percentage >= 60) return { message: "Good choices with room for improvement", color: "text-yellow-600" };
    return { message: "Consider healthier lifestyle changes", color: "text-orange-600" };
  };

  if (gameComplete) {
    const scoreMessage = getScoreMessage();
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-yellow-600" />
            <CardTitle>Game Complete!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="mb-2">Your Score</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {score} / {scenarios.length * 3}
            </div>
            <p className={scoreMessage.color}>{scoreMessage.message}</p>
          </div>
          
          <Button onClick={resetGame} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500" />
            <CardTitle>Lifestyle Choice Game</CardTitle>
          </div>
          <Badge variant="outline">
            {currentScenario + 1} / {scenarios.length}
          </Badge>
        </div>
        <Progress value={((currentScenario + 1) / scenarios.length) * 100} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-gray-900">
            {scenarios[currentScenario].situation}
          </h3>
          
          <div className="space-y-3">
            {scenarios[currentScenario].choices.map((choice, index) => (
              <Button
                key={index}
                variant={selectedChoice === index ? "default" : "outline"}
                className={`w-full text-left p-4 h-auto ${
                  showFeedback && selectedChoice === index
                    ? choice.points === 3 ? "bg-green-100 border-green-300" :
                      choice.points === 2 ? "bg-yellow-100 border-yellow-300" :
                      choice.points === 1 ? "bg-orange-100 border-orange-300" :
                      "bg-red-100 border-red-300"
                    : ""
                }`}
                onClick={() => !showFeedback && handleChoice(index)}
                disabled={showFeedback}
              >
                <div className="flex items-center space-x-3">
                  {showFeedback && selectedChoice === index && (
                    choice.points >= 2 ? 
                    <CheckCircle className="w-5 h-5 text-green-600" /> :
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  <span>{choice.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {showFeedback && selectedChoice !== null && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              {scenarios[currentScenario].choices[selectedChoice].feedback}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Current Score: {score}
          </div>
          <div className="text-sm text-gray-600">
            Points: 3 = Excellent, 2 = Good, 1 = Fair, 0 = Poor
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MemoryMatchingGame() {
  const [cards, setCards] = useState<Array<{id: number, term: string, definition: string, isFlipped: boolean, isMatched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const cardPairs = [
    { term: "Systolic", definition: "Top number in BP reading" },
    { term: "Diastolic", definition: "Bottom number in BP reading" },
    { term: "DASH Diet", definition: "Diet rich in fruits, vegetables, whole grains" },
    { term: "Hypertension", definition: "High blood pressure (140/90+)" },
    { term: "Prehypertension", definition: "BP between 120-139/80-89" },
    { term: "White Coat", definition: "High BP only in medical settings" }
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && matches < cardPairs.length) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, matches, cardPairs.length]);

  const initializeGame = () => {
    const gameCards = [];
    cardPairs.forEach((pair, index) => {
      gameCards.push(
        { id: index * 2, term: pair.term, definition: pair.definition, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, term: pair.term, definition: pair.definition, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
  };

  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (!gameStarted) setGameStarted(true);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first].term === cards[second].term) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setMatches(matches + 1);
          setFlippedCards([]);
          
          if (matches + 1 === cardPairs.length) {
            toast.success(`Congratulations! Completed in ${timeElapsed} seconds!`);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const resetGame = () => {
    setMatches(0);
    setFlippedCards([]);
    setGameStarted(false);
    setTimeElapsed(0);
    initializeGame();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shuffle className="w-6 h-6 text-purple-600" />
            <CardTitle>Hypertension Memory Match</CardTitle>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{timeElapsed}s</span>
            </div>
            <Badge variant="outline">
              {matches} / {cardPairs.length} matches
            </Badge>
          </div>
        </div>
        <p className="text-gray-600">
          Match hypertension terms with their definitions. Click cards to flip them and find matching pairs.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => flipCard(index)}
              className={`aspect-square p-2 rounded-lg border-2 transition-all duration-300 ${
                card.isMatched 
                  ? 'bg-green-100 border-green-300 text-green-800' 
                  : card.isFlipped 
                    ? 'bg-blue-100 border-blue-300 text-blue-800' 
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
              }`}
            >
              <div className="text-xs leading-tight">
                {card.isFlipped || card.isMatched 
                  ? (index % 2 === 0 ? card.term : card.definition)
                  : '?'
                }
              </div>
            </button>
          ))}
        </div>

        {matches === cardPairs.length && (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-green-800 mb-2">🎉 Congratulations!</h3>
              <p className="text-green-700">
                You completed the game in {timeElapsed} seconds with {matches} matches!
              </p>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <Button onClick={resetGame} variant="outline" className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Game
          </Button>
          {matches === cardPairs.length && (
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              <Award className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}