import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, AlertTriangle, Shield, Activity, Zap, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function InformationalSections() {
  const symptoms = [
    { icon: <Heart className="w-5 h-5" />, title: "Headaches", description: "Frequent or severe headaches, especially in the morning" },
    { icon: <Zap className="w-5 h-5" />, title: "Dizziness", description: "Feeling lightheaded or unstable, particularly when standing" },
    { icon: <Activity className="w-5 h-5" />, title: "Chest Pain", description: "Tightness or pressure in the chest area" },
    { icon: <AlertTriangle className="w-5 h-5" />, title: "Vision Changes", description: "Blurred vision or seeing spots" },
    { icon: <Target className="w-5 h-5" />, title: "Shortness of Breath", description: "Difficulty breathing during normal activities" },
    { icon: <Heart className="w-5 h-5" />, title: "Nosebleeds", description: "Frequent or unexplained nosebleeds" },
  ];

  const preventionTips = [
    {
      category: "Diet",
      color: "bg-green-500",
      tips: [
        "Reduce sodium intake to less than 2,300mg daily",
        "Eat plenty of fruits and vegetables",
        "Choose whole grains over refined carbohydrates",
        "Limit processed and fast foods"
      ]
    },
    {
      category: "Exercise",
      color: "bg-blue-500",
      tips: [
        "Aim for 150 minutes of moderate exercise weekly",
        "Include both cardio and strength training",
        "Take the stairs instead of elevators",
        "Walk for 30 minutes most days of the week"
      ]
    },
    {
      category: "Lifestyle",
      color: "bg-purple-500",
      tips: [
        "Maintain a healthy weight",
        "Limit alcohol consumption",
        "Quit smoking and avoid secondhand smoke",
        "Manage stress through meditation or yoga"
      ]
    },
    {
      category: "Monitoring",
      color: "bg-teal-500",
      tips: [
        "Check blood pressure regularly at home",
        "Keep a blood pressure log",
        "Take medications as prescribed",
        "Schedule regular check-ups with your doctor"
      ]
    }
  ];

  return (
    <>
      {/* What is Hypertension Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
                Understanding the Basics
              </Badge>
              <h2 className="mb-6">What is Hypertension?</h2>
              <p className="text-gray-600">
                Also known as high blood pressure, hypertension is a common condition where the force of blood against artery walls is consistently too high.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    Blood pressure is measured using two numbers: <strong>systolic</strong> (top number) represents pressure when your heart beats, while <strong>diastolic</strong> (bottom number) represents pressure when your heart rests between beats.
                  </p>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-6">
                    <h3 className="text-gray-900 mb-4">Blood Pressure Categories:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Normal:</span>
                        <span className="text-green-600">Less than 120/80 mmHg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Elevated:</span>
                        <span className="text-yellow-600">120-129/less than 80 mmHg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Stage 1:</span>
                        <span className="text-orange-600">130-139/80-89 mmHg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Stage 2:</span>
                        <span className="text-red-600">140/90 mmHg or higher</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwbW9uaXRvcnxlbnwxfHx8fDE3NTUzNDAzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Blood pressure monitor showing measurement reading"
                  className="w-full h-[350px] object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms & Risks Section */}
      <section id="symptoms" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-red-100 text-red-700">
                Warning Signs
              </Badge>
              <h2 className="mb-6">Symptoms & Risk Factors</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                High blood pressure is often called the "silent killer" because it typically has no symptoms until it reaches dangerous levels. However, some people may experience these warning signs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {symptoms.map((symptom, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        {symptom.icon}
                      </div>
                      <CardTitle>{symptom.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{symptom.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-red-800 mb-2">Important Note</h3>
                  <p className="text-red-700">
                    Many people with high blood pressure have no symptoms at all. Regular blood pressure monitoring is crucial for early detection and prevention of serious complications like heart disease, stroke, and kidney damage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention & Management Section */}
      <section id="prevention" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700">
                Take Action
              </Badge>
              <h2 className="mb-6">Prevention & Management Tips</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Small lifestyle changes can make a big difference in managing your blood pressure. Here are evidence-based strategies that have helped thousands of people.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {preventionTips.map((category, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                      <CardTitle>{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3">
                          <Shield className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600408986933-5feb4659ebff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGVhcnQlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU1MzQwMzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthy lifestyle choices including fresh fruits and exercise equipment"
                className="w-full h-[300px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="mb-2">Start Your Journey Today</h3>
                  <p className="opacity-90">Every healthy choice makes a difference</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}