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
import { Badge } from "@/components/ui/badge";
import { Pill, Plus, Edit, Trash2, DollarSign } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  description: string;
  price: number;
  dosage: string;
  frequency: string;
  forPetTypes: string[];
  manufacturer: string;
  inStock: boolean;
  imageUrl?: string;
}

const MedicationsList = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Heartgard Plus",
      description: "Monthly heartworm prevention for dogs",
      price: 45.99,
      dosage: "1 chewable tablet",
      frequency: "Monthly",
      forPetTypes: ["Dog"],
      manufacturer: "Boehringer Ingelheim",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
    },
    {
      id: "2",
      name: "Frontline Plus",
      description: "Flea and tick prevention for cats and dogs",
      price: 38.5,
      dosage: "1 applicator",
      frequency: "Monthly",
      forPetTypes: ["Dog", "Cat"],
      manufacturer: "Merial",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1598543926675-40f170ae3170?w=300&q=80",
    },
    {
      id: "3",
      name: "Apoquel",
      description: "For treatment of allergic dermatitis in dogs",
      price: 89.99,
      dosage: "16mg tablet",
      frequency: "Daily",
      forPetTypes: ["Dog"],
      manufacturer: "Zoetis",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&q=80",
    },
    {
      id: "4",
      name: "Cosequin",
      description: "Joint health supplement for dogs and cats",
      price: 32.99,
      dosage: "1-2 tablets",
      frequency: "Daily",
      forPetTypes: ["Dog", "Cat"],
      manufacturer: "Nutramax Laboratories",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1585435557343-3b348031e799?w=300&q=80",
    },
    {
      id: "5",
      name: "Revolution",
      description: "Parasite prevention for cats",
      price: 42.75,
      dosage: "1 applicator",
      frequency: "Monthly",
      forPetTypes: ["Cat"],
      manufacturer: "Zoetis",
      inStock: false,
      imageUrl:
        "https://images.unsplash.com/photo-1606591199505-4292e101dce7?w=300&q=80",
    },
  ]);

  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [filterPetType, setFilterPetType] = useState<string | null>(null);

  const handleViewMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setIsViewOpen(true);
  };

  const filteredMedications = filterPetType
    ? medications.filter((med) => med.forPetTypes.includes(filterPetType))
    : medications;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medications</h1>
        <div className="flex gap-4">
          <Select onValueChange={(value) => setFilterPetType(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by pet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Pets</SelectItem>
              <SelectItem value="Dog">Dogs</SelectItem>
              <SelectItem value="Cat">Cats</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Medication
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedications.map((medication) => (
          <Card key={medication.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              {medication.imageUrl ? (
                <img
                  src={medication.imageUrl}
                  alt={medication.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <Pill className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{medication.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {medication.description}
                  </CardDescription>
                </div>
                <Badge variant={medication.inStock ? "default" : "destructive"}>
                  {medication.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center text-lg font-bold text-primary mb-2">
                <DollarSign className="h-4 w-4" />
                {medication.price.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Dosage:</span>{" "}
                  {medication.dosage}
                </p>
                <p>
                  <span className="font-medium">Frequency:</span>{" "}
                  {medication.frequency}
                </p>
                <p>
                  <span className="font-medium">For:</span>{" "}
                  {medication.forPetTypes.join(", ")}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Button
                variant="outline"
                onClick={() => handleViewMedication(medication)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Medication Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedMedication && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMedication.name}</DialogTitle>
                <DialogDescription>
                  {selectedMedication.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-center mb-4">
                  {selectedMedication.imageUrl && (
                    <img
                      src={selectedMedication.imageUrl}
                      alt={selectedMedication.name}
                      className="h-48 w-auto object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary flex items-center">
                    <DollarSign className="h-5 w-5" />
                    {selectedMedication.price.toFixed(2)}
                  </div>
                  <Badge
                    variant={
                      selectedMedication.inStock ? "default" : "destructive"
                    }
                  >
                    {selectedMedication.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Dosage
                    </p>
                    <p>{selectedMedication.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Frequency
                    </p>
                    <p>{selectedMedication.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      For Pet Types
                    </p>
                    <p>{selectedMedication.forPetTypes.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Manufacturer
                    </p>
                    <p>{selectedMedication.manufacturer}</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
                <Button>Add to Cart</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicationsList;
