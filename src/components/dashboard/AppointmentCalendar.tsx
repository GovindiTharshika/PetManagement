import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Plus, Edit2, Trash2 } from "lucide-react";

interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: string;
  petName: string;
  provider: string;
  notes?: string;
}

interface AppointmentCalendarProps {
  appointments?: Appointment[];
  onBookAppointment?: (appointment: Omit<Appointment, "id">) => void;
  onReschedule?: (id: string, newDate: Date, newTime: string) => void;
  onCancel?: (id: string) => void;
}

const AppointmentCalendar = ({
  appointments = [
    {
      id: "1",
      title: "Vet Checkup",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "10:00 AM",
      type: "Veterinary",
      petName: "Max",
      provider: "Dr. Smith Animal Clinic",
    },
    {
      id: "2",
      title: "Grooming",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: "2:30 PM",
      type: "Grooming",
      petName: "Bella",
      provider: "Pet Spa & Grooming",
    },
    {
      id: "3",
      title: "Vaccination",
      date: new Date(),
      time: "3:45 PM",
      type: "Veterinary",
      petName: "Charlie",
      provider: "Dr. Smith Animal Clinic",
    },
  ],
  onBookAppointment = () => {},
  onReschedule = () => {},
  onCancel = () => {},
}: AppointmentCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Form states for new appointment
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: new Date(),
    time: "",
    type: "",
    petName: "",
    provider: "",
    notes: "",
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookAppointment({
      title: newAppointment.title,
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      petName: newAppointment.petName,
      provider: newAppointment.provider,
      notes: newAppointment.notes,
    });
    setIsBookingOpen(false);
    // Reset form
    setNewAppointment({
      title: "",
      date: new Date(),
      time: "",
      type: "",
      petName: "",
      provider: "",
      notes: "",
    });
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsViewOpen(true);
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      onCancel(selectedAppointment.id);
      setIsViewOpen(false);
      setSelectedAppointment(null);
    }
  };

  // Filter appointments for the selected date
  const appointmentsForSelectedDate = appointments.filter(
    (appointment) =>
      date &&
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear(),
  );

  // Helper function to get appointment type color
  const getAppointmentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "veterinary":
        return "bg-blue-500";
      case "grooming":
        return "bg-green-500";
      case "training":
        return "bg-yellow-500";
      case "boarding":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Appointment Calendar</span>
                    <Dialog
                      open={isBookingOpen}
                      onOpenChange={setIsBookingOpen}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex items-center gap-1">
                          <Plus size={16} />
                          <span>Book</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Book New Appointment</DialogTitle>
                          <DialogDescription>
                            Fill in the details to schedule a new appointment
                            for your pet.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleBookingSubmit}>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="title">Appointment Title</Label>
                              <Input
                                id="title"
                                value={newAppointment.title}
                                onChange={(e) =>
                                  setNewAppointment({
                                    ...newAppointment,
                                    title: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="type">Appointment Type</Label>
                              <Select
                                onValueChange={(value) =>
                                  setNewAppointment({
                                    ...newAppointment,
                                    type: value,
                                  })
                                }
                                required
                              >
                                <SelectTrigger id="type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Veterinary">
                                    Veterinary
                                  </SelectItem>
                                  <SelectItem value="Grooming">
                                    Grooming
                                  </SelectItem>
                                  <SelectItem value="Training">
                                    Training
                                  </SelectItem>
                                  <SelectItem value="Boarding">
                                    Boarding
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="pet">Pet</Label>
                              <Select
                                onValueChange={(value) =>
                                  setNewAppointment({
                                    ...newAppointment,
                                    petName: value,
                                  })
                                }
                                required
                              >
                                <SelectTrigger id="pet">
                                  <SelectValue placeholder="Select pet" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Max">Max</SelectItem>
                                  <SelectItem value="Bella">Bella</SelectItem>
                                  <SelectItem value="Charlie">
                                    Charlie
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="provider">Service Provider</Label>
                              <Select
                                onValueChange={(value) =>
                                  setNewAppointment({
                                    ...newAppointment,
                                    provider: value,
                                  })
                                }
                                required
                              >
                                <SelectTrigger id="provider">
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Dr. Smith Animal Clinic">
                                    Dr. Smith Animal Clinic
                                  </SelectItem>
                                  <SelectItem value="Pet Spa & Grooming">
                                    Pet Spa & Grooming
                                  </SelectItem>
                                  <SelectItem value="Paws Training Center">
                                    Paws Training Center
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <div className="flex items-center">
                                  <Input
                                    id="date"
                                    type="date"
                                    onChange={(e) =>
                                      setNewAppointment({
                                        ...newAppointment,
                                        date: new Date(e.target.value),
                                      })
                                    }
                                    required
                                  />
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                  id="time"
                                  type="time"
                                  onChange={(e) =>
                                    setNewAppointment({
                                      ...newAppointment,
                                      time: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Input
                                id="notes"
                                value={newAppointment.notes}
                                onChange={(e) =>
                                  setNewAppointment({
                                    ...newAppointment,
                                    notes: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Book Appointment</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                  <CardDescription>
                    Manage your pet's appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {date ? (
                      <span>Appointments for {date.toLocaleDateString()}</span>
                    ) : (
                      <span>Select a date</span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {appointmentsForSelectedDate.length} appointments scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {appointmentsForSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                      {appointmentsForSelectedDate.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => handleViewAppointment(appointment)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {appointment.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {appointment.petName} • {appointment.provider}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${getAppointmentTypeColor(appointment.type)} text-white`}
                            >
                              {appointment.type}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="mx-auto h-12 w-12 opacity-30" />
                      <p className="mt-2">
                        No appointments scheduled for this date
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        Book an Appointment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>All Upcoming Appointments</span>
                <Button size="sm" onClick={() => setIsBookingOpen(true)}>
                  <Plus size={16} className="mr-1" /> Book
                </Button>
              </CardTitle>
              <CardDescription>
                View and manage all scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-12 rounded-full ${getAppointmentTypeColor(appointment.type)}`}
                          ></div>
                          <div>
                            <h3 className="font-medium">{appointment.title}</h3>
                            <p className="text-sm text-gray-500">
                              {appointment.petName} • {appointment.provider}
                            </p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <CalendarIcon size={14} className="mr-1" />
                              {appointment.date.toLocaleDateString()} at{" "}
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${getAppointmentTypeColor(appointment.type)} text-white`}
                        >
                          {appointment.type}
                        </Badge>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No upcoming appointments</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setIsBookingOpen(true)}
                    >
                      Book an Appointment
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View/Edit Appointment Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAppointment.title}</DialogTitle>
                <DialogDescription>
                  Appointment details for {selectedAppointment.petName}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p>{selectedAppointment.date.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p>{selectedAppointment.time}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <Badge
                    variant="outline"
                    className={`${getAppointmentTypeColor(selectedAppointment.type)} text-white mt-1`}
                  >
                    {selectedAppointment.type}
                  </Badge>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p>{selectedAppointment.provider}</p>
                </div>
                {selectedAppointment.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-sm">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="destructive" onClick={handleCancelAppointment}>
                  <Trash2 size={16} className="mr-1" /> Cancel Appointment
                </Button>
                <Button>
                  <Edit2 size={16} className="mr-1" /> Reschedule
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentCalendar;
