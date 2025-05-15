import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  BarChart,
  Scale,
  Activity,
  Utensils,
  Ruler,
} from "lucide-react";

interface WeightRecord {
  date: string;
  weight: number;
}

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  weightHistory: WeightRecord[];
  dietHistory: {
    date: string;
    food: string;
    amount: string;
    calories: number;
  }[];
  exerciseHistory: {
    date: string;
    activity: string;
    duration: number;
    intensity: string;
  }[];
  measurements: {
    height: string;
    length: string;
    lastUpdated: string;
  };
}

const HealthMetrics = () => {
  const [selectedPet, setSelectedPet] = useState<string>("1");

  const pets: Pet[] = [
    {
      id: "1",
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      weightHistory: [
        { date: "2023-01-15", weight: 65.2 },
        { date: "2023-02-15", weight: 66.5 },
        { date: "2023-03-15", weight: 67.1 },
        { date: "2023-04-15", weight: 66.8 },
        { date: "2023-05-15", weight: 66.3 },
        { date: "2023-06-15", weight: 65.9 },
      ],
      dietHistory: [
        {
          date: "2023-06-14",
          food: "Premium Dry Dog Food",
          amount: "2 cups",
          calories: 720,
        },
        {
          date: "2023-06-13",
          food: "Premium Dry Dog Food",
          amount: "2 cups",
          calories: 720,
        },
        {
          date: "2023-06-12",
          food: "Premium Dry Dog Food",
          amount: "2 cups",
          calories: 720,
        },
        {
          date: "2023-06-11",
          food: "Premium Dry Dog Food + Chicken",
          amount: "2 cups + 4oz",
          calories: 850,
        },
        {
          date: "2023-06-10",
          food: "Premium Dry Dog Food",
          amount: "2 cups",
          calories: 720,
        },
      ],
      exerciseHistory: [
        {
          date: "2023-06-14",
          activity: "Walk",
          duration: 45,
          intensity: "Moderate",
        },
        {
          date: "2023-06-13",
          activity: "Fetch",
          duration: 30,
          intensity: "High",
        },
        {
          date: "2023-06-12",
          activity: "Walk",
          duration: 30,
          intensity: "Low",
        },
        {
          date: "2023-06-11",
          activity: "Dog Park",
          duration: 60,
          intensity: "High",
        },
        {
          date: "2023-06-10",
          activity: "Walk",
          duration: 40,
          intensity: "Moderate",
        },
      ],
      measurements: {
        height: "24 inches",
        length: "36 inches",
        lastUpdated: "2023-05-15",
      },
    },
    {
      id: "2",
      name: "Bella",
      type: "Cat",
      breed: "Siamese",
      weightHistory: [
        { date: "2023-01-15", weight: 8.2 },
        { date: "2023-02-15", weight: 8.5 },
        { date: "2023-03-15", weight: 8.7 },
        { date: "2023-04-15", weight: 8.9 },
        { date: "2023-05-15", weight: 9.1 },
        { date: "2023-06-15", weight: 9.0 },
      ],
      dietHistory: [
        {
          date: "2023-06-14",
          food: "Premium Cat Food",
          amount: "1/2 cup",
          calories: 250,
        },
        {
          date: "2023-06-13",
          food: "Premium Cat Food",
          amount: "1/2 cup",
          calories: 250,
        },
        {
          date: "2023-06-12",
          food: "Premium Cat Food + Wet Food",
          amount: "1/2 cup + 2oz",
          calories: 320,
        },
        {
          date: "2023-06-11",
          food: "Premium Cat Food",
          amount: "1/2 cup",
          calories: 250,
        },
        {
          date: "2023-06-10",
          food: "Premium Cat Food",
          amount: "1/2 cup",
          calories: 250,
        },
      ],
      exerciseHistory: [
        {
          date: "2023-06-14",
          activity: "Play with toys",
          duration: 15,
          intensity: "Moderate",
        },
        {
          date: "2023-06-13",
          activity: "Climbing cat tree",
          duration: 10,
          intensity: "High",
        },
        {
          date: "2023-06-12",
          activity: "Play with toys",
          duration: 20,
          intensity: "Moderate",
        },
        {
          date: "2023-06-11",
          activity: "Chasing laser pointer",
          duration: 15,
          intensity: "High",
        },
        {
          date: "2023-06-10",
          activity: "Play with toys",
          duration: 10,
          intensity: "Low",
        },
      ],
      measurements: {
        height: "10 inches",
        length: "18 inches",
        lastUpdated: "2023-05-15",
      },
    },
  ];

  const currentPet = pets.find((pet) => pet.id === selectedPet) || pets[0];

  // Helper function to get weight trend
  const getWeightTrend = (history: WeightRecord[]) => {
    if (history.length < 2) return "stable";
    const latest = history[history.length - 1].weight;
    const previous = history[history.length - 2].weight;
    if (latest > previous) return "increasing";
    if (latest < previous) return "decreasing";
    return "stable";
  };

  const weightTrend = getWeightTrend(currentPet.weightHistory);
  const latestWeight =
    currentPet.weightHistory[currentPet.weightHistory.length - 1].weight;

  // Calculate average exercise duration
  const avgExerciseDuration =
    currentPet.exerciseHistory.reduce(
      (sum, record) => sum + record.duration,
      0,
    ) / currentPet.exerciseHistory.length;

  // Calculate average daily calories
  const avgCalories =
    currentPet.dietHistory.reduce((sum, record) => sum + record.calories, 0) /
    currentPet.dietHistory.length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Health Metrics</h1>
        <div className="flex gap-4">
          <Select value={selectedPet} onValueChange={setSelectedPet}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select pet" />
            </SelectTrigger>
            <SelectContent>
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id}>
                  {pet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>Record New Metrics</Button>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview for {currentPet.name}</CardTitle>
            <CardDescription>
              {currentPet.breed} • {currentPet.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Weight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Scale className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">{latestWeight} lbs</div>
                  </div>
                  <p
                    className={`text-xs mt-1 ${weightTrend === "increasing" ? "text-red-500" : weightTrend === "decreasing" ? "text-green-500" : "text-muted-foreground"}`}
                  >
                    {weightTrend === "increasing"
                      ? "↑"
                      : weightTrend === "decreasing"
                        ? "↓"
                        : "→"}{" "}
                    {weightTrend.charAt(0).toUpperCase() + weightTrend.slice(1)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Exercise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">
                      {avgExerciseDuration.toFixed(0)} min
                    </div>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Daily average
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Utensils className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">
                      {avgCalories.toFixed(0)}
                    </div>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Daily intake
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="text-md font-bold">
                      {currentPet.measurements.height} H ×{" "}
                      {currentPet.measurements.length} L
                    </div>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Last updated: {currentPet.measurements.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="weight">Weight History</TabsTrigger>
          <TabsTrigger value="diet">Diet</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
        </TabsList>

        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Weight History</CardTitle>
              <CardDescription>
                Track {currentPet.name}'s weight over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p>Weight chart visualization would appear here</p>
                  <p className="text-sm">
                    Showing data from {currentPet.weightHistory[0].date} to{" "}
                    {
                      currentPet.weightHistory[
                        currentPet.weightHistory.length - 1
                      ].date
                    }
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Weight Records</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left font-medium">Date</th>
                        <th className="p-2 text-left font-medium">
                          Weight (lbs)
                        </th>
                        <th className="p-2 text-left font-medium">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...currentPet.weightHistory]
                        .reverse()
                        .map((record, index, array) => {
                          const prevWeight =
                            index < array.length - 1
                              ? array[index + 1].weight
                              : record.weight;
                          const change = record.weight - prevWeight;
                          return (
                            <tr key={record.date} className="border-t">
                              <td className="p-2">{record.date}</td>
                              <td className="p-2">{record.weight}</td>
                              <td className="p-2">
                                {index < array.length - 1 && (
                                  <span
                                    className={
                                      change > 0
                                        ? "text-red-500"
                                        : change < 0
                                          ? "text-green-500"
                                          : "text-muted-foreground"
                                    }
                                  >
                                    {change > 0 ? "+" : ""}
                                    {change.toFixed(1)} lbs
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Add Weight Record</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="diet">
          <Card>
            <CardHeader>
              <CardTitle>Diet History</CardTitle>
              <CardDescription>
                Track {currentPet.name}'s food intake
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center border rounded-md mb-6">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p>Calorie intake chart would appear here</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Recent Diet Records</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left font-medium">Date</th>
                        <th className="p-2 text-left font-medium">Food</th>
                        <th className="p-2 text-left font-medium">Amount</th>
                        <th className="p-2 text-left font-medium">Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPet.dietHistory.map((record) => (
                        <tr key={record.date} className="border-t">
                          <td className="p-2">{record.date}</td>
                          <td className="p-2">{record.food}</td>
                          <td className="p-2">{record.amount}</td>
                          <td className="p-2">{record.calories}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Add Diet Record</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Exercise History</CardTitle>
              <CardDescription>
                Track {currentPet.name}'s physical activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center border rounded-md mb-6">
                <div className="text-center text-muted-foreground">
                  <Activity className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p>Exercise duration chart would appear here</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Recent Exercise Records</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left font-medium">Date</th>
                        <th className="p-2 text-left font-medium">Activity</th>
                        <th className="p-2 text-left font-medium">Duration</th>
                        <th className="p-2 text-left font-medium">Intensity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPet.exerciseHistory.map((record) => (
                        <tr key={record.date} className="border-t">
                          <td className="p-2">{record.date}</td>
                          <td className="p-2">{record.activity}</td>
                          <td className="p-2">{record.duration} min</td>
                          <td className="p-2">{record.intensity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Add Exercise Record</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMetrics;
