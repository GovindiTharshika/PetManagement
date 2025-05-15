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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Plus,
  Pill,
  AlertCircle,
  Check,
  X,
} from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  time: string;
  notes?: string;
  isActive: boolean;
  lastGiven?: Date;
}

const MedicationTracker = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
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
      name: "Antibiotics",
      dosage: "10mg",
      frequency: "Twice Daily",
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 5, 14),
      time: "08:00,20:00",
      isActive: true,
    },
    {
      id: "3",
      name: "Joint Supplement",
      dosage: "1 scoop",
      frequency: "Daily",
      startDate: new Date(2023, 2, 10),
      time: "18:00",
      notes: "Mix with food",
      isActive: true,
      lastGiven: new Date(2023, 5, 9),
    },
  ]);

  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleMarkAsGiven = (id: string) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, lastGiven: new Date() } : med,
      ),
    );
  };

  const handleAddMedication = (
    medication: Omit<Medication, "id" | "isActive">,
  ) => {
    const newMedication = {
      ...medication,
      id: Date.now().toString(),
      isActive: true,
    };
    setMedications([...medications, newMedication]);
    setIsAddMedicationOpen(false);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Medication Tracker</CardTitle>
            <CardDescription>
              Manage your pet's medications and schedules
            </CardDescription>
          </div>
          <Dialog
            open={isAddMedicationOpen}
            onOpenChange={setIsAddMedicationOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Medication
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Medication</DialogTitle>
                <DialogDescription>
                  Enter the details of the medication your pet needs to take.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Medication Name</Label>
                  <Input id="name" placeholder="Enter medication name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" placeholder="e.g., 1 tablet, 10mg" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="twice-daily">Twice Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input id="notes" placeholder="Additional instructions" />
                </div>
              </form>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddMedicationOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Medication</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Medications</TabsTrigger>
            <TabsTrigger value="history">Medication History</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="space-y-4 mt-4">
            {medications.filter((med) => med.isActive).length > 0 ? (
              medications
                .filter((med) => med.isActive)
                .map((medication) => (
                  <Card key={medication.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Pill className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{medication.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {medication.dosage} - {medication.frequency}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>
                                {medication.time.includes(",")
                                  ? "Multiple times"
                                  : medication.time}
                              </span>
                            </div>
                            {medication.notes && (
                              <p className="text-xs mt-2 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {medication.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center"
                            onClick={() => handleMarkAsGiven(medication.id)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Mark as Given
                          </Button>
                          <Button size="sm" variant="ghost">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {medication.lastGiven && (
                        <div className="mt-3 text-xs text-muted-foreground border-t pt-2">
                          Last given: {format(medication.lastGiven, "PPP")}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active medications</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsAddMedicationOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Medication
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history" className="space-y-4 mt-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Medication history will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 flex justify-between">
        <div className="text-sm text-muted-foreground">
          {medications.filter((med) => med.isActive).length} active medications
        </div>
        <Button variant="link" size="sm">
          View All Medications
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicationTracker;
