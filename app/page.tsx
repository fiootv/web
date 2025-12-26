import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5">
      <div className="max-w-5xl w-full text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Unlimited Entertainment
          <br />
          <span className="text-primary">Best TV Service Provider</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          FiooTV gives you the flexibility of watching your favorite episodes anytime and on any device.
          <br />
          <span className="text-lg">TV, Smartphones, Laptops & Handheld Devices</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started Today
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            View Plans
          </Button>
        </div>
      </div>
    </main>
  );
}
