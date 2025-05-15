import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Bell, Settings } from "lucide-react";
import PetProfileCard from "./dashboard/PetProfileCard";
import AppointmentCalendar from "./dashboard/AppointmentCalendar";
import MedicationTracker from "./dashboard/MedicationTracker";

const Home = () => {
  // Mock data for pet profiles
  const pets = [
    {
      id: 1,
      name: "Max",
      breed: "Golden Retriever",
      age: "3 years",
      photo:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&q=80",
    },
    {
      id: 2,
      name: "Bella",
      breed: "Siamese Cat",
      age: "2 years",
      photo:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&q=80",
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Beagle",
      age: "4 years",
      photo:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=300&q=80",
    },
  ];

  // Mock data for upcoming appointments
  const appointments = [
    {
      id: 1,
      petId: 1,
      title: "Vet Checkup",
      date: new Date(2023, 6, 15, 10, 30),
      provider: "Dr. Smith",
    },
    {
      id: 2,
      petId: 2,
      title: "Grooming",
      date: new Date(2023, 6, 18, 14, 0),
      provider: "PetSpa",
    },
  ];

  // Mock data for medications
  const medications = [
    {
      id: 1,
      petId: 1,
      name: "Heartworm Prevention",
      dosage: "1 tablet",
      frequency: "Monthly",
      nextDue: new Date(2023, 6, 20),
    },
    {
      id: 2,
      petId: 3,
      name: "Joint Supplement",
      dosage: "2 tablets",
      frequency: "Daily",
      nextDue: new Date(2023, 6, 12),
    },
    {
      id: 3,
      petId: 2,
      name: "Flea Treatment",
      dosage: "1 application",
      frequency: "Monthly",
      nextDue: new Date(2023, 6, 25),
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border h-full p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">PetCare</h1>
          <p className="text-sm text-muted-foreground">
            Manage your pets with ease
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Pet Profiles
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Appointments
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              Medications
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              Vaccinations
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Health Metrics
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Expenses
            </span>
          </Button>
        </nav>

        <div className="mt-auto space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <span className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Pet
            </Button>
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
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pet
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pets.map((pet) => (
                    <PetProfileCard key={pet.id} pet={pet} />
                  ))}
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
                        const pet = pets.find(
                          (p) => p.id === appointment.petId,
                        );
                        return (
                          <div
                            key={appointment.id}
                            className="flex items-center p-3 border rounded-lg"
                          >
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img
                                src={pet?.photo}
                                alt={pet?.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {appointment.title}
                              </h4>
                              <div className="text-sm text-muted-foreground">
                                {pet?.name} •{" "}
                                {appointment.date.toLocaleDateString()} at{" "}
                                {appointment.date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
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
                                src={pet?.photo}
                                alt={pet?.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{medication.name}</h4>
                              <div className="text-sm text-muted-foreground">
                                {pet?.name} • {medication.dosage} • Due{" "}
                                {medication.nextDue.toLocaleDateString()}
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
                <AppointmentCalendar appointments={appointments} pets={pets} />
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
                <MedicationTracker medications={medications} pets={pets} />
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
