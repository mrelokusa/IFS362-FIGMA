import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle, RotateCcw, AlertTriangle, Heart, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface QuizQuestion {
  id: string;
  question: string;
  options: { text: string; score: number; explanation?: string }[];
  category: 'demographic' | 'lifestyle' | 'medical' | 'family';
}

export function HypertensionQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [results, setResults] = useState<{
    totalScore: number;
    riskLevel: string;
    riskPercentage: number;
    recommendations: string[];
    categoryScores: Record<string, number>;
  } | null>(null);

  const questions: QuizQuestion[] = [
    {
      id: 'age',
      category: 'demographic',
      question: 'What is your age?',
      options: [
        { text: 'Under 35', score: 0 },
        { text: '35-44', score: 1 },
        { text: '45-54', score: 2 },
        { text: '55-64', score: 3 },
        { text: '65 or older', score: 4 }
      ]
    },
    {
      id: 'gender',
      category: 'demographic',
      question: 'What is your biological sex?',
      options: [
        { text: 'Female (under 65)', score: 0 },
        { text: 'Female (65 or older)', score: 2 },
        { text: 'Male (under 55)', score: 1 },
        { text: 'Male (55 or older)', score: 3 }
      ]
    },
    {
      id: 'ethnicity',
      category: 'demographic',
      question: 'What is your ethnicity?',
      options: [
        { text: 'White/Caucasian', score: 0 },
        { text: 'Hispanic/Latino', score: 1 },
        { text: 'Asian', score: 1 },
        { text: 'African American/Black', score: 2 },
        { text: 'Other', score: 1 }
      ]
    },
    {
      id: 'bmi',
      category: 'lifestyle',
      question: 'What is your current BMI category?',
      options: [
        { text: 'Underweight (BMI < 18.5)', score: 1 },
        { text: 'Normal weight (BMI 18.5-24.9)', score: 0 },
        { text: 'Overweight (BMI 25-29.9)', score: 2 },
        { text: 'Obese Class I (BMI 30-34.9)', score: 3 },
        { text: 'Obese Class II+ (BMI ≥ 35)', score: 4 }
      ]
    },
    {
      id: 'exercise',
      category: 'lifestyle',
      question: 'How often do you engage in moderate to vigorous physical activity?',
      options: [
        { text: '5+ times per week, 30+ minutes', score: 0 },
        { text: '3-4 times per week, 30+ minutes', score: 1 },
        { text: '1-2 times per week', score: 2 },
        { text: 'Occasionally (less than weekly)', score: 3 },
        { text: 'Rarely or never', score: 4 }
      ]
    },
    {
      id: 'smoking',
      category: 'lifestyle',
      question: 'What is your smoking status?',
      options: [
        { text: 'Never smoked', score: 0 },
        { text: 'Former smoker (quit >5 years ago)', score: 1 },
        { text: 'Former smoker (quit 1-5 years ago)', score: 2 },
        { text: 'Current smoker (occasional)', score: 3 },
        { text: 'Current smoker (daily)', score: 4 }
      ]
    },
    {
      id: 'alcohol',
      category: 'lifestyle',
      question: 'How much alcohol do you consume per week?',
      options: [
        { text: 'None', score: 0 },
        { text: '1-7 drinks per week', score: 0 },
        { text: '8-14 drinks per week', score: 1 },
        { text: '15-21 drinks per week', score: 2 },
        { text: 'More than 21 drinks per week', score: 3 }
      ]
    },
    {
      id: 'diet',
      category: 'lifestyle',
      question: 'How would you describe your typical diet?',
      options: [
        { text: 'DASH diet or Mediterranean diet', score: 0 },
        { text: 'Mostly healthy with occasional processed foods', score: 1 },
        { text: 'Mixed - some healthy, some processed foods', score: 2 },
        { text: 'Frequently eat processed/fast foods', score: 3 },
        { text: 'Diet high in sodium, processed foods daily', score: 4 }
      ]
    },
    {
      id: 'stress',
      category: 'lifestyle',
      question: 'How do you rate your stress levels and stress management?',
      options: [
        { text: 'Low stress with good coping strategies', score: 0 },
        { text: 'Moderate stress, generally well-managed', score: 1 },
        { text: 'Moderate stress, sometimes overwhelming', score: 2 },
        { text: 'High stress, difficulty managing', score: 3 },
        { text: 'Chronic high stress, poor coping', score: 4 }
      ]
    },
    {
      id: 'diabetes',
      category: 'medical',
      question: 'Do you have diabetes or prediabetes?',
      options: [
        { text: 'No, normal blood sugar', score: 0 },
        { text: 'Prediabetes (borderline)', score: 2 },
        { text: 'Type 2 diabetes, well-controlled', score: 3 },
        { text: 'Type 2 diabetes, poorly controlled', score: 4 },
        { text: 'Type 1 diabetes', score: 3 }
      ]
    },
    {
      id: 'cholesterol',
      category: 'medical',
      question: 'What is your cholesterol status?',
      options: [
        { text: 'Normal levels (Total <200, LDL <100)', score: 0 },
        { text: 'Borderline high (Total 200-239)', score: 1 },
        { text: 'High cholesterol (Total ≥240)', score: 2 },
        { text: 'High cholesterol on medication', score: 2 },
        { text: 'Unknown/Never tested', score: 1 }
      ]
    },
    {
      id: 'kidney',
      category: 'medical',
      question: 'Do you have kidney disease or kidney problems?',
      options: [
        { text: 'No kidney problems', score: 0 },
        { text: 'Mild kidney dysfunction', score: 2 },
        { text: 'Moderate to severe kidney disease', score: 4 },
        { text: 'On dialysis', score: 4 },
        { text: 'Unknown/Never tested', score: 1 }
      ]
    },
    {
      id: 'sleep',
      category: 'medical',
      question: 'How is your sleep quality?',
      options: [
        { text: '7-9 hours nightly, good quality', score: 0 },
        { text: '6-7 hours, generally good quality', score: 1 },
        { text: 'Less than 6 hours or poor quality', score: 2 },
        { text: 'Sleep apnea (treated)', score: 2 },
        { text: 'Sleep apnea (untreated) or severe insomnia', score: 3 }
      ]
    },
    {
      id: 'family_history',
      category: 'family',
      question: 'Family history of high blood pressure?',
      options: [
        { text: 'No family history', score: 0 },
        { text: 'One parent with hypertension after age 60', score: 1 },
        { text: 'One parent with hypertension before age 60', score: 2 },
        { text: 'Both parents with hypertension', score: 3 },
        { text: 'Multiple family members with early hypertension', score: 4 }
      ]
    },
    {
      id: 'heart_disease_family',
      category: 'family',
      question: 'Family history of heart disease or stroke?',
      options: [
        { text: 'No family history', score: 0 },
        { text: 'Family member with heart disease after age 65', score: 1 },
        { text: 'Family member with heart disease before age 65', score: 2 },
        { text: 'Multiple family members with heart disease', score: 3 },
        { text: 'Family history of early stroke (<55 years)', score: 3 }
      ]
    }
  ];

  const calculateResults = (allAnswers: Record<string, number>) => {
    const totalScore = Object.values(allAnswers).reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);
    
    // Calculate category scores
    const categoryScores: Record<string, number> = {};
    questions.forEach(q => {
      if (!categoryScores[q.category]) categoryScores[q.category] = 0;
      categoryScores[q.category] += allAnswers[q.id] || 0;
    });

    // Risk level calculation based on score
    let riskLevel = '';
    let riskPercentage = 0;
    
    if (totalScore <= 8) {
      riskLevel = 'Low Risk';
      riskPercentage = 15;
    } else if (totalScore <= 16) {
      riskLevel = 'Moderate Risk';
      riskPercentage = 35;
    } else if (totalScore <= 25) {
      riskLevel = 'High Risk';
      riskPercentage = 60;
    } else {
      riskLevel = 'Very High Risk';
      riskPercentage = 85;
    }

    // Generate personalized recommendations
    const recommendations: string[] = [];
    
    if (categoryScores.lifestyle > 8) {
      recommendations.push('Focus on lifestyle modifications: increase physical activity, improve diet, and manage stress');
    }
    if (categoryScores.medical > 6) {
      recommendations.push('Schedule regular medical check-ups and discuss your cardiovascular risk with a healthcare provider');
    }
    if (categoryScores.family > 4) {
      recommendations.push('Given your family history, earlier and more frequent blood pressure monitoring is recommended');
    }
    if (allAnswers.exercise >= 3) {
      recommendations.push('Aim for at least 150 minutes of moderate exercise per week');
    }
    if (allAnswers.diet >= 3) {
      recommendations.push('Consider adopting a DASH diet with reduced sodium intake');
    }
    if (allAnswers.smoking >= 3) {
      recommendations.push('Smoking cessation is crucial for reducing cardiovascular risk');
    }

    if (recommendations.length === 0) {
      recommendations.push('Maintain your current healthy lifestyle and continue regular monitoring');
    }

    return {
      totalScore,
      riskLevel,
      riskPercentage,
      recommendations,
      categoryScores
    };
  };

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const results = calculateResults(newAnswers);
      setResults(results);
      setQuizComplete(true);
      toast.success('Assessment completed! Review your personalized results below.');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
    setResults(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (quizComplete && results) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <CardTitle>Your Hypertension Risk Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Level Display */}
          <div className="text-center space-y-4">
            <div className={`p-6 rounded-xl border-2 ${
              results.riskLevel === "Low Risk" ? "bg-green-50 border-green-200" :
              results.riskLevel === "Moderate Risk" ? "bg-yellow-50 border-yellow-200" :
              results.riskLevel === "High Risk" ? "bg-orange-50 border-orange-200" :
              "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-center justify-center space-x-3 mb-3">
                {results.riskLevel === "Low Risk" ? (
                  <Heart className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className={`w-8 h-8 ${
                    results.riskLevel === "Moderate Risk" ? "text-yellow-600" :
                    results.riskLevel === "High Risk" ? "text-orange-600" :
                    "text-red-600"
                  }`} />
                )}
                <Badge variant={
                  results.riskLevel === "Low Risk" ? "secondary" : 
                  results.riskLevel === "Moderate Risk" ? "secondary" :
                  "destructive"
                } className="text-lg px-4 py-2">
                  {results.riskLevel}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-700">
                  Estimated 10-year cardiovascular risk: <strong>{results.riskPercentage}%</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Assessment Score: {results.totalScore} points
                </p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            <h4 className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Risk Factor Breakdown</span>
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(results.categoryScores).map(([category, score]) => (
                <div key={category} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="capitalize text-sm">{category.replace('_', ' ')}</span>
                    <Badge variant="outline">{score} pts</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h4>Personalized Recommendations</h4>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Medical Disclaimer:</strong> This assessment is for educational purposes only and does not replace professional medical advice. Please consult with a healthcare provider for personalized medical guidance.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Assessment Again
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Download Results
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Comprehensive Hypertension Risk Assessment</CardTitle>
        <p className="text-gray-600">
          This evidence-based assessment evaluates your risk factors for developing high blood pressure based on current medical guidelines.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Current Question */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Badge variant="outline" className="mt-1">
              {questions[currentQuestion].category}
            </Badge>
            <h3 className="text-gray-900 leading-relaxed">
              {questions[currentQuestion].question}
            </h3>
          </div>
          
          <RadioGroup 
            onValueChange={(value) => {
              const option = questions[currentQuestion].options.find(o => o.text === value);
              if (option) {
                handleAnswer(questions[currentQuestion].id, option.score);
              }
            }} 
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={option.text} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <p className="text-sm text-gray-500 self-center">
            Category: {questions[currentQuestion].category.replace('_', ' ')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
