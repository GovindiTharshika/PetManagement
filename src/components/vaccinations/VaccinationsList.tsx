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
import {
  Syringe,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface Vaccination {
  id: string;
  name: string;
  description: string;
  price: number;
  forPetTypes: string[];
  manufacturer: string;
  frequency: string;
  recommendedAge: string;
  inStock: boolean;
  imageUrl?: string;
  sideEffects?: string;
}

const VaccinationsList = () => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([
    {
      id: "1",
      name: "Rabies Vaccine",
      description: "Core vaccine required by law in most areas",
      price: 25.99,
      forPetTypes: ["Dog", "Cat"],
      manufacturer: "Zoetis",
      frequency: "1-3 years",
      recommendedAge: "12-16 weeks",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
      sideEffects: "Mild fever, lethargy, reduced appetite",
    },
    {
      id: "2",
      name: "DHPP Vaccine",
      description:
        "Protects against Distemper, Hepatitis, Parainfluenza, and Parvovirus",
      price: 32.5,
      forPetTypes: ["Dog"],
      manufacturer: "Merck Animal Health",
      frequency: "1 year",
      recommendedAge: "6-8 weeks, with boosters",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&q=80",
    },
    {
      id: "3",
      name: "FVRCP Vaccine",
      description:
        "Protects cats against Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia",
      price: 28.99,
      forPetTypes: ["Cat"],
      manufacturer: "Boehringer Ingelheim",
      frequency: "1 year",
      recommendedAge: "6-8 weeks, with boosters",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1606591199505-4292e101dce7?w=300&q=80",
    },
    {
      id: "4",
      name: "Bordetella Vaccine",
      description: "Protects against kennel cough",
      price: 22.75,
      forPetTypes: ["Dog"],
      manufacturer: "Zoetis",
      frequency: "6 months - 1 year",
      recommendedAge: "8 weeks",
      inStock: true,
      imageUrl:
        "https://images.unsplash.com/photo-1585435557343-3b348031e799?w=300&q=80",
    },
    {
      id: "5",
      name: "Leptospirosis Vaccine",
      description: "Protects against bacterial infection",
      price: 24.5,
      forPetTypes: ["Dog"],
      manufacturer: "Merck Animal Health",
      frequency: "1 year",
      recommendedAge: "12 weeks, with booster",
      inStock: false,
      imageUrl:
        "https://images.unsplash.com/photo-1598543926675-40f170ae3170?w=300&q=80",
      sideEffects: "Facial swelling, hives (rare)",
    },
  ]);

  const [selectedVaccination, setSelectedVaccination] =
    useState<Vaccination | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [filterPetType, setFilterPetType] = useState<string | null>(null);

  const handleViewVaccination = (vaccination: Vaccination) => {
    setSelectedVaccination(vaccination);
    setIsViewOpen(true);
  };

  const filteredVaccinations = filterPetType
    ? vaccinations.filter((vac) => vac.forPetTypes.includes(filterPetType))
    : vaccinations;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vaccinations</h1>
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
            <Plus className="mr-2 h-4 w-4" /> Add Vaccination
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVaccinations.map((vaccination) => (
          <Card key={vaccination.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              {vaccination.imageUrl ? (
                <img
                  src={vaccination.imageUrl}
                  alt={vaccination.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <Syringe className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{vaccination.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {vaccination.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={vaccination.inStock ? "default" : "destructive"}
                >
                  {vaccination.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center text-lg font-bold text-primary mb-2">
                <DollarSign className="h-4 w-4" />
                {vaccination.price.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">For:</span>{" "}
                  {vaccination.forPetTypes.join(", ")}
                </p>
                <p className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="font-medium mr-1">Frequency:</span>{" "}
                  {vaccination.frequency}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Button
                variant="outline"
                onClick={() => handleViewVaccination(vaccination)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Vaccination Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedVaccination && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedVaccination.name}</DialogTitle>
                <DialogDescription>
                  {selectedVaccination.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-center mb-4">
                  {selectedVaccination.imageUrl && (
                    <img
                      src={selectedVaccination.imageUrl}
                      alt={selectedVaccination.name}
                      className="h-48 w-auto object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary flex items-center">
                    <DollarSign className="h-5 w-5" />
                    {selectedVaccination.price.toFixed(2)}
                  </div>
                  <Badge
                    variant={
                      selectedVaccination.inStock ? "default" : "destructive"
                    }
                  >
                    {selectedVaccination.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      For Pet Types
                    </p>
                    <p>{selectedVaccination.forPetTypes.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Manufacturer
                    </p>
                    <p>{selectedVaccination.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Frequency
                    </p>
                    <p>{selectedVaccination.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Recommended Age
                    </p>
                    <p>{selectedVaccination.recommendedAge}</p>
                  </div>
                </div>
                {selectedVaccination.sideEffects && (
                  <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Possible Side Effects</p>
                        <p className="text-sm">
                          {selectedVaccination.sideEffects}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                <Button>Schedule Vaccination</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VaccinationsList;
