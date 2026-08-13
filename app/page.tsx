"use client";

import { ScrollSnapShell } from "@/components/ScrollSnapShell";
import { WelcomeScene } from "@/components/scenes/WelcomeScene";
import { CoupleScene } from "@/components/scenes/CoupleScene";
import { StoryScene } from "@/components/scenes/StoryScene";
import { CountdownScene } from "@/components/scenes/CountdownScene";
import { EventsScene } from "@/components/scenes/EventsScene";
import { DressCodeScene } from "@/components/scenes/DressCodeScene";
import { VenueScene } from "@/components/scenes/VenueScene";
import { StayScene } from "@/components/scenes/StayScene";
import { WeatherScene } from "@/components/scenes/WeatherScene";
import { FinaleScene } from "@/components/scenes/FinaleScene";

export default function Home() {
  return (
    <ScrollSnapShell>
      <WelcomeScene />
      <CoupleScene />
      <StoryScene />
      <CountdownScene />
      <EventsScene />
      <DressCodeScene />
      <VenueScene />
      <StayScene />
      <WeatherScene />
      <FinaleScene />
    </ScrollSnapShell>
  );
}
