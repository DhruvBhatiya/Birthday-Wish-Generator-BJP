import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Gift, Cake, Sparkles, PartyPopper } from "lucide-react";
import heroImage from "@/assets/birthday-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    recipientName: "",
    selectedWishes: [] as string[]
  });

  const birthdayWishes = [
    "May your birthday be filled with endless joy, laughter, and beautiful moments that create cherished memories.",
    "Wishing you a year ahead filled with amazing opportunities, incredible adventures, and all your dreams coming true.",
    "On your special day, may you be surrounded by love, happiness, and all the wonderful people who care about you.",
    "Here's to celebrating another year of your amazing life! May this new chapter be your best one yet.",
    "May your birthday sparkle with joy and your year ahead shine with success and happiness.",
    "Wishing you a day filled with cake, presents, laughter, and all your favorite things in the world.",
    "Another year older, another year wiser, and another year more wonderful! Happy birthday to an amazing person.",
    "May this birthday mark the beginning of a year filled with good health, great fortune, and endless possibilities.",
    "On your birthday, I wish you all the happiness your heart can hold and all the success life can bring.",
    "Here's to celebrating you today and always! May your birthday be as special as you are to everyone around you.",
    "Wishing you a birthday that's just as wonderful, unique, and amazing as you are. Enjoy every moment!",
    "May your special day be filled with sweet surprises, heartfelt wishes, and beautiful moments with loved ones.",
    "Another year of incredible experiences awaits you! May your birthday be the perfect start to your best year yet.",
    "Sending you warm birthday wishes filled with love, joy, and all the magical moments that make life beautiful.",
    "May your birthday celebration be filled with laughter, your year ahead with adventure, and your heart with happiness."
  ];

  const handleWishToggle = (wish: string) => {
    setFormData(prev => ({
      ...prev,
      selectedWishes: prev.selectedWishes.includes(wish)
        ? prev.selectedWishes.filter(w => w !== wish)
        : [...prev.selectedWishes, wish]
    }));
  };

  const handleGenerate = () => {
    if (!formData.recipientName) {
      alert("Please enter the recipient's name!");
      return;
    }
    if (formData.selectedWishes.length === 0) {
      alert("Please select at least one birthday wish!");
      return;
    }
    
    navigate('/preview', {
      state: {
        recipientName: formData.recipientName,
        selectedWishes: formData.selectedWishes,
        senderName: formData.name
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Birthday celebration with balloons and decorations" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-celebration opacity-80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6 animate-bounce-gentle">
            <PartyPopper className="h-8 w-8 text-celebration-yellow" />
            <h1 className="text-5xl font-bold bg-gradient-festive bg-clip-text text-transparent">
              Birthday Wish Generator
            </h1>
            <Sparkles className="h-8 w-8 text-celebration-purple animate-sparkle" />
          </div>
          {/* <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Create personalized birthday wishes that will make someone's special day unforgettable! 
            Choose from heartfelt messages and customize them perfectly.
          </p> */}
        </div>
      </div>

      {/* Main Form */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <Cake className="h-8 w-8 animate-float" />
              Create Magical Birthday Wishes
              <Heart className="h-8 w-8 text-celebration-pink animate-float" />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Your Name*
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="border-2 border-border focus:border-primary transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="border-2 border-border focus:border-primary transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="border-2 border-border focus:border-primary transition-colors"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            {/* Recipient Name */}
            <div className="space-y-2">
              <Label htmlFor="recipientName" className="text-sm font-medium text-foreground">
                Birthday Person's Name*
              </Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                className="border-2 border-border focus:border-primary transition-colors text-lg"
                placeholder="Who is celebrating their birthday?"
              />
            </div>

            {/* Birthday Wishes Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Gift className="h-5 w-5 text-celebration-orange" />
                Select Birthday Wishes:
              </Label>
              
              <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                {birthdayWishes.map((wish, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                    <Checkbox
                      id={`wish-${index}`}
                      checked={formData.selectedWishes.includes(wish)}
                      onCheckedChange={() => handleWishToggle(wish)}
                      className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label 
                      htmlFor={`wish-${index}`}
                      className="text-sm leading-relaxed cursor-pointer hover:text-primary transition-colors"
                    >
                      {wish}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleGenerate}
                className="px-12 py-6 text-lg font-semibold bg-gradient-celebration hover:scale-105 transform transition-all duration-200 shadow-lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Birthday Wishes
                <PartyPopper className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;