import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PetProfileCard from "../dashboard/PetProfileCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  photoUrl?: string;
  type: string;
  weight?: string;
  birthdate?: string;
  microchipId?: string;
  allergies?: string;
  specialNeeds?: string;
}

const PetsList = () => {
  const [pets, setPets] = useState<Pet[]>([
    {
      id: "1",
      name: "Buddy",
      breed: "Golden Retriever",
      age: 3,
      photoUrl:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&q=80",
      type: "Dog",
      weight: "65 lbs",
      birthdate: "2020-05-15",
      microchipId: "985121056478523",
      allergies: "Chicken",
    },
    {
      id: "2",
      name: "Bella",
      breed: "Siamese Cat",
      age: 2,
      photoUrl:
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&q=80",
      type: "Cat",
      weight: "8 lbs",
      birthdate: "2021-08-23",
      microchipId: "985121056478524",
    },
    {
      id: "3",
      name: "Charlie",
      breed: "Beagle",
      age: 4,
      photoUrl:
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=300&q=80",
      type: "Dog",
      weight: "25 lbs",
      birthdate: "2019-11-10",
      microchipId: "985121056478525",
      specialNeeds: "Joint supplements",
    },
  ]);

  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isViewPetOpen, setIsViewPetOpen] = useState(false);
  const [isEditPetOpen, setIsEditPetOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [newPet, setNewPet] = useState<Omit<Pet, "id">>({
    name: "",
    breed: "",
    age: 0,
    type: "Dog",
  });

  const handleAddPet = () => {
    // Validate required fields
    if (!newPet.name || !newPet.breed) {
      alert("Please fill in all required fields");
      return;
    }

    const pet = {
      ...newPet,
      id: Date.now().toString(),
    };
    setPets([...pets, pet]);
    setIsAddPetOpen(false);
    setNewPet({
      name: "",
      breed: "",
      age: 0,
      type: "Dog",
      weight: "",
      birthdate: "",
      microchipId: "",
      allergies: "",
      specialNeeds: "",
      photoUrl: "",
    });
  };

  const handleViewPet = (id: string) => {
    const pet = pets.find((p) => p.id === id);
    if (pet) {
      setSelectedPet(pet);
      setIsViewPetOpen(true);
    }
  };

  const handleEditPet = (id: string) => {
    const pet = pets.find((p) => p.id === id);
    if (pet) {
      setSelectedPet(pet);
      setIsEditPetOpen(true);
    }
  };

  const handleUpdatePet = () => {
    if (selectedPet) {
      setPets(pets.map((p) => (p.id === selectedPet.id ? selectedPet : p)));
      setIsEditPetOpen(false);
      setSelectedPet(null);
    }
  };

  const handleDeletePet = () => {
    if (selectedPet) {
      setPets(pets.filter((p) => p.id !== selectedPet.id));
      setIsViewPetOpen(false);
      setSelectedPet(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pet Profiles</h1>
        <Dialog open={isAddPetOpen} onOpenChange={setIsAddPetOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Pet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Pet</DialogTitle>
              <DialogDescription>
                Enter your pet's information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPet.name}
                  onChange={(e) =>
                    setNewPet({ ...newPet, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newPet.type}
                  onValueChange={(value) =>
                    setNewPet({ ...newPet, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Bird">Bird</SelectItem>
                    <SelectItem value="Fish">Fish</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="breed" className="text-right">
                  Breed
                </Label>
                <Input
                  id="breed"
                  value={newPet.breed}
                  onChange={(e) =>
                    setNewPet({ ...newPet, breed: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={newPet.age}
                  onChange={(e) =>
                    setNewPet({ ...newPet, age: parseInt(e.target.value) || 0 })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="photoUrl" className="text-right">
                  Photo URL
                </Label>
                <Input
                  id="photoUrl"
                  value={newPet.photoUrl || ""}
                  onChange={(e) =>
                    setNewPet({ ...newPet, photoUrl: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="https://example.com/pet.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPet}>Add Pet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetProfileCard
            key={pet.id}
            pet={pet}
            onView={handleViewPet}
            onEdit={handleEditPet}
          />
        ))}
        <PetProfileCard isAddCard onAdd={() => setIsAddPetOpen(true)} />
      </div>

      {/* View Pet Dialog */}
      <Dialog open={isViewPetOpen} onOpenChange={setIsViewPetOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedPet?.name}</DialogTitle>
            <DialogDescription>Pet details and information</DialogDescription>
          </DialogHeader>
          {selectedPet && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                {selectedPet.photoUrl && (
                  <img
                    src={selectedPet.photoUrl}
                    alt={selectedPet.name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-right">Type:</span>
                <span className="col-span-3">{selectedPet.type}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-right">Breed:</span>
                <span className="col-span-3">{selectedPet.breed}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-right">Age:</span>
                <span className="col-span-3">{selectedPet.age} years</span>
              </div>
              {selectedPet.weight && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Weight:</span>
                  <span className="col-span-3">{selectedPet.weight}</span>
                </div>
              )}
              {selectedPet.birthdate && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Birthdate:</span>
                  <span className="col-span-3">{selectedPet.birthdate}</span>
                </div>
              )}
              {selectedPet.microchipId && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Microchip ID:</span>
                  <span className="col-span-3">{selectedPet.microchipId}</span>
                </div>
              )}
              {selectedPet.allergies && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Allergies:</span>
                  <span className="col-span-3">{selectedPet.allergies}</span>
                </div>
              )}
              {selectedPet.specialNeeds && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Special Needs:</span>
                  <span className="col-span-3">{selectedPet.specialNeeds}</span>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDeletePet}>
              Delete
            </Button>
            <Button
              onClick={() => {
                setIsViewPetOpen(false);
                setIsEditPetOpen(true);
              }}
            >
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Pet Dialog */}
      <Dialog open={isEditPetOpen} onOpenChange={setIsEditPetOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {selectedPet?.name}</DialogTitle>
            <DialogDescription>Update your pet's information</DialogDescription>
          </DialogHeader>
          {selectedPet && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedPet.name}
                  onChange={(e) =>
                    setSelectedPet({ ...selectedPet, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={selectedPet.type}
                  onValueChange={(value) =>
                    setSelectedPet({ ...selectedPet, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Bird">Bird</SelectItem>
                    <SelectItem value="Fish">Fish</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-breed" className="text-right">
                  Breed
                </Label>
                <Input
                  id="edit-breed"
                  value={selectedPet.breed}
                  onChange={(e) =>
                    setSelectedPet({ ...selectedPet, breed: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-age" className="text-right">
                  Age
                </Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={selectedPet.age}
                  onChange={(e) =>
                    setSelectedPet({
                      ...selectedPet,
                      age: parseInt(e.target.value) || 0,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-photoUrl" className="text-right">
                  Photo URL
                </Label>
                <Input
                  id="edit-photoUrl"
                  value={selectedPet.photoUrl || ""}
                  onChange={(e) =>
                    setSelectedPet({ ...selectedPet, photoUrl: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-weight" className="text-right">
                  Weight
                </Label>
                <Input
                  id="edit-weight"
                  value={selectedPet.weight || ""}
                  onChange={(e) =>
                    setSelectedPet({ ...selectedPet, weight: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-birthdate" className="text-right">
                  Birthdate
                </Label>
                <Input
                  id="edit-birthdate"
                  type="date"
                  value={selectedPet.birthdate || ""}
                  onChange={(e) =>
                    setSelectedPet({
                      ...selectedPet,
                      birthdate: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-microchipId" className="text-right">
                  Microchip ID
                </Label>
                <Input
                  id="edit-microchipId"
                  value={selectedPet.microchipId || ""}
                  onChange={(e) =>
                    setSelectedPet({
                      ...selectedPet,
                      microchipId: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-allergies" className="text-right">
                  Allergies
                </Label>
                <Input
                  id="edit-allergies"
                  value={selectedPet.allergies || ""}
                  onChange={(e) =>
                    setSelectedPet({
                      ...selectedPet,
                      allergies: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-specialNeeds" className="text-right">
                  Special Needs
                </Label>
                <Input
                  id="edit-specialNeeds"
                  value={selectedPet.specialNeeds || ""}
                  onChange={(e) =>
                    setSelectedPet({
                      ...selectedPet,
                      specialNeeds: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdatePet}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetsList;
