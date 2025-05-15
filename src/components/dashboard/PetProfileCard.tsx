import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Eye, Plus } from "lucide-react";

interface PetProfileCardProps {
  pet?: {
    id: string;
    name: string;
    breed: string;
    age: number;
    photoUrl?: string;
    type: string;
  };
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onAdd?: () => void;
  isAddCard?: boolean;
}

const PetProfileCard = ({
  pet = {
    id: "1",
    name: "Buddy",
    breed: "Golden Retriever",
    age: 3,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=pet",
    type: "Dog",
  },
  onView = () => {},
  onEdit = () => {},
  onAdd = () => {},
  isAddCard = false,
}: PetProfileCardProps) => {
  if (isAddCard) {
    return (
      <Card className="w-[350px] h-[200px] flex flex-col items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors bg-background">
        <CardContent className="flex flex-col items-center justify-center h-full">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full h-16 w-16 mb-2"
            onClick={onAdd}
          >
            <Plus className="h-8 w-8" />
          </Button>
          <p className="text-lg font-medium">Add New Pet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] h-[200px] overflow-hidden bg-background">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={pet.photoUrl} alt={pet.name} />
              <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{pet.name}</h3>
              <p className="text-sm text-muted-foreground">{pet.type}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Breed:</span> {pet.breed}
          </p>
          <p className="text-sm">
            <span className="font-medium">Age:</span> {pet.age}{" "}
            {pet.age === 1 ? "year" : "years"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onView(pet.id)}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(pet.id)}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetProfileCard;
