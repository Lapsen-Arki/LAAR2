import { useState } from "react";
import "./AnimalAvatarWidget.css";
import Avatar from "@mui/material/Avatar";

//https://www.svgrepo.com/collection/animals-bordered-flat-vectors

const AnimalAvatarWidget: React.FC<{
  onSelect: (selectedAvatar: string) => void;
}> = ({ onSelect }) => {
  const [selectedAnimal, setSelectedAnimal] = useState("none");

  const animalOptions = [
    {
      name: "Ei avataria",
      imageComponent: (
        <Avatar
          src="/broken-image.jpg"
          onClick={() =>
            handleSelect({ name: "Ei avataria", imageUrl: "/broken-image.jpg" })
          }
          sx={{
            borderRadius: "50%",
            backgroundColor: "#90c2c5",
          }}
        />
      ),
    },
    {
      name: "Panda",
      imageUrl: "https://www.svgrepo.com/show/454501/animal-domestic-panda.svg",
    },
    {
      name: "Härkä",
      imageUrl: "https://www.svgrepo.com/show/454502/animal-bull-domestic.svg",
    },
    {
      name: "Hiiri",
      imageUrl:
        "https://www.svgrepo.com/show/454503/animal-domestic-mouse2.svg",
    },
    {
      name: "Hiiri",
      imageUrl: "https://www.svgrepo.com/show/454584/animal-domestic-mouse.svg",
    },
    {
      name: "Sammakko",
      imageUrl: "https://www.svgrepo.com/show/454504/animal-domestic-frog.svg",
    },
    {
      name: "Possu",
      imageUrl: "https://www.svgrepo.com/show/454505/animal-domestic-pet.svg",
    },
    {
      name: "Leppis",
      imageUrl: "https://www.svgrepo.com/show/454506/animal-bug-domestic.svg",
    },
    {
      name: "Rapu",
      imageUrl: "https://www.svgrepo.com/show/454507/animal-crab-domestic.svg",
    },
    {
      name: "Sarvikuono",
      imageUrl:
        "https://www.svgrepo.com/show/454508/animal-domestic-pet-12.svg",
    },
    {
      name: "Kissa",
      imageUrl: "https://www.svgrepo.com/show/454509/animal-cat-domestic.svg",
    },
    {
      name: "Valas",
      imageUrl: "https://www.svgrepo.com/show/454510/animal-domestic-pet-2.svg",
    },
    {
      name: "Lehmä",
      imageUrl: "https://www.svgrepo.com/show/454511/animal-cow-domestic.svg",
    },
    {
      name: "Heinäsirkka",
      imageUrl: "https://www.svgrepo.com/show/454512/animal-bug-domestic-4.svg",
    },
    {
      name: "Jänis",
      imageUrl: "https://www.svgrepo.com/show/454513/animal-domestic-pet-6.svg",
    },
    {
      name: "Coala",
      imageUrl:
        "https://www.svgrepo.com/show/454514/animal-domestic-face-2.svg",
    },
    {
      name: "Medusa",
      imageUrl:
        "https://www.svgrepo.com/show/454515/animal-domestic-octopus-3.svg",
    },
    {
      name: "Koira",
      imageUrl: "https://www.svgrepo.com/show/454517/animal-dog-domestic-3.svg",
    },
    {
      name: "Gorilla",
      imageUrl:
        "https://www.svgrepo.com/show/454518/animal-domestic-orangoutang.svg",
    },
    {
      name: "Ampiainen",
      imageUrl: "https://www.svgrepo.com/show/454520/animal-bug-domestic-7.svg",
    },
    {
      name: "Kirahvi",
      imageUrl:
        "https://www.svgrepo.com/show/454521/animal-domestic-giraffe.svg",
    },
    {
      name: "Karhu",
      imageUrl: "https://www.svgrepo.com/show/454524/animal-domestic-face.svg",
    },
    {
      name: "Lepakko",
      imageUrl: "https://www.svgrepo.com/show/454547/animal-bat-domestic.svg",
    },
    {
      name: "Perhonen",
      imageUrl: "https://www.svgrepo.com/show/454529/animal-bug-butterfly.svg",
    },
    {
      name: "Ankka",
      imageUrl:
        "https://www.svgrepo.com/show/454533/animal-babyduck-domestic.svg",
    },
    {
      name: "Lintu",
      imageUrl:
        "https://www.svgrepo.com/show/454538/animal-bird-domestic-2.svg",
    },
    {
      name: "Etana",
      imageUrl: "https://www.svgrepo.com/show/454549/animal-domestic-pet-7.svg",
    },
    {
      name: "Muurahainen",
      imageUrl: "https://www.svgrepo.com/show/454550/animal-ant-domestic.svg",
    },
    {
      name: "Siili",
      imageUrl:
        "https://www.svgrepo.com/show/454554/animal-domestic-hedgehog.svg",
    },
    {
      name: "Kala",
      imageUrl:
        "https://www.svgrepo.com/show/454555/animal-aquarium-domestic2.svg",
    },
    {
      name: "Hai",
      imageUrl:
        "https://www.svgrepo.com/show/454561/animal-domestic-pet-17.svg",
    },
    {
      name: "Pöllö",
      imageUrl: "https://www.svgrepo.com/show/454575/animal-domestic-owl.svg",
    },
    {
      name: "Leijona",
      imageUrl: "https://www.svgrepo.com/show/454577/animal-domestic-lion.svg",
    },
    {
      name: "Kilpikonna",
      imageUrl:
        "https://www.svgrepo.com/show/454580/animal-domestic-pet-15.svg",
    },
    {
      name: "Koira",
      imageUrl: "https://www.svgrepo.com/show/454581/animal-dog-domestic.svg",
    },
    {
      name: "Lammas",
      imageUrl: "https://www.svgrepo.com/show/454583/animal-domestic-pet-3.svg",
    },
    {
      name: "Kissa",
      imageUrl: "https://www.svgrepo.com/show/454585/animal-cat-domestic-2.svg",
    },
  ];

  const handleSelect = (animal: {
    name: string;
    imageUrl?: string;
    imageComponent?: JSX.Element;
  }) => {
    onSelect(animal.imageUrl || "");
    setSelectedAnimal(animal.name.toLowerCase());
  };

  return (
    <div className="animal-avatar-widget">
      <div className="animal-options">
        {animalOptions.map((option, index) => (
          <div key={index} className="animal-option">
            <div className={option.name === "Ei avataria" ? "name-center" : ""}>
              {option.imageComponent ? (
                option.imageComponent // Näytetään määritelty komponentti "Ei avataria" -kohdassa
              ) : (
                <img
                  className={`ChooseAvatar ${selectedAnimal === option.name.toLowerCase() ? "selected" : ""}`}
                  src={option.imageUrl}
                  alt={option.name}
                  onClick={() => handleSelect(option)}
                />
              )}
            </div>
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalAvatarWidget;
