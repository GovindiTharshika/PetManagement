import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Bell, Settings, ArrowRight } from "lucide-react";
import PetProfileCard from "./dashboard/PetProfileCard";
import AppointmentCalendar from "./dashboard/AppointmentCalendar";
import MedicationTracker from "./dashboard/MedicationTracker";

const Home = () => {
  // Mock data for pet profiles
  const pets = [
    {
      id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: 3,
      photoUrl:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&q=80",
      type: "Dog",
    },
    {
      id: "2",
      name: "Bella",
      breed: "Siamese Cat",
      age: 2,
      photoUrl:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&q=80",
      type: "Cat",
    },
    {
      id: "3",
      name: "Charlie",
      breed: "Beagle",
      age: 4,
      photoUrl:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=300&q=80",
      type: "Dog",
    },
  ];

  // Mock data for upcoming appointments
  const appointments = [
    {
      id: "1",
      petId: "1",
      title: "Vet Checkup",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "10:00 AM",
      type: "Veterinary",
      petName: "Max",
      provider: "Dr. Smith Animal Clinic",
    },
    {
      id: "2",
      petId: "2",
      title: "Grooming",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: "2:30 PM",
      type: "Grooming",
      petName: "Bella",
      provider: "Pet Spa & Grooming",
    },
  ];

  // Mock data for medications
  const medications = [
    {
      id: "1",
      petId: "1",
      name: "Heartworm Prevention",
      dosage: "1 tablet",
      frequency: "Monthly",
      startDate: new Date(2023, 0, 15),
      time: "08:00",
      notes: "Give with food",
      isActive: true,
      lastGiven: new Date(2023, 4, 15),
    },
    {
      id: "2",
      petId: "3",
      name: "Joint Supplement",
      dosage: "2 tablets",
      frequency: "Daily",
      startDate: new Date(2023, 2, 10),
      time: "18:00",
      notes: "Mix with food",
      isActive: true,
      lastGiven: new Date(2023, 5, 9),
    },
    {
      id: "3",
      petId: "2",
      name: "Flea Treatment",
      dosage: "1 application",
      frequency: "Monthly",
      startDate: new Date(2023, 3, 25),
      time: "09:00",
      isActive: true,
      lastGiven: new Date(2023, 4, 25),
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Link to="/pets">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Pet
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Pet Profiles Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pet Profiles</CardTitle>
              <Link to="/pets">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pet
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets.map((pet) => (
                  <PetProfileCard
                    key={pet.id}
                    pet={pet}
                    onView={() => {}}
                    onEdit={() => {}}
                  />
                ))}
                <PetProfileCard isAddCard onAdd={() => {}} />
              </div>
              <div className="mt-4 text-right">
                <Link to="/pets">
                  <Button variant="link" className="flex items-center">
                    View All Pets <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => {
                      const pet = pets.find((p) => p.id === appointment.petId);
                      return (
                        <div
                          key={appointment.id}
                          className="flex items-center p-3 border rounded-lg"
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img
                              src={pet?.photoUrl}
                              alt={pet?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{appointment.title}</h4>
                            <div className="text-sm text-muted-foreground">
                              {pet?.name} •{" "}
                              {appointment.date.toLocaleDateString()} at{" "}
                              {appointment.time}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No upcoming appointments
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Link to="/appointments">
                    <Button variant="link" className="flex items-center">
                      View All Appointments{" "}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Medication Reminders */}
            <Card>
              <CardHeader>
                <CardTitle>Medication Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                {medications.length > 0 ? (
                  <div className="space-y-4">
                    {medications.map((medication) => {
                      const pet = pets.find((p) => p.id === medication.petId);
                      return (
                        <div
                          key={medication.id}
                          className="flex items-center p-3 border rounded-lg"
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img
                              src={pet?.photoUrl}
                              alt={pet?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{medication.name}</h4>
                            <div className="text-sm text-muted-foreground">
                              {pet?.name} • {medication.dosage} • Due{" "}
                              {medication.lastGiven
                                ? new Date(
                                    medication.lastGiven.getTime() +
                                      30 * 24 * 60 * 60 * 1000,
                                  ).toLocaleDateString()
                                : "Soon"}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Mark Given
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No medication reminders
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Link to="/medications">
                    <Button variant="link" className="flex items-center">
                      View All Medications{" "}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentCalendar appointments={appointments} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medication Tracker</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </CardHeader>
            <CardContent>
              <MedicationTracker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>Health metrics tracking coming soon!</p>
                <p className="text-sm">
                  Track weight, diet, exercise, and more.
                </p>
                <Link to="/health" className="mt-4 inline-block">
                  <Button variant="outline">View Health Metrics</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
