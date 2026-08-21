"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Download,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Lock,
  Play,
  Rocket,
  Sparkles,
  Target,
  TestTube2,
  Upload,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { campaignMock, getMockProduct } from "@/features/campaign/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const steps = [
  ["brief", "01", "Brief & signals", FileText],
  ["strategy", "02", "Strategy", Target],
  ["routes", "03", "Routes A/B", TestTube2],
  ["images", "04", "Image matrix", ImageIcon],
  ["video", "05", "Video studio", Video],
  ["copy", "06", "Commerce copy", Copy],
  ["launch", "07", "A/B plan & launch", Rocket],
] as const;
const imageMatrix = [
  [
    "Hero image",
    "Product-centered studio",
    "1:1 · 1200×1200",
    "Clean studio",
    "Hero",
  ],
  [
    "Detail & macro",
    "Texture / formula proof",
    "3:4 · 1080×1440",
    "Macro product",
    "Detail",
  ],
  [
    "Lifestyle context",
    "Use moment and aspiration",
    "4:5 · 1080×1350",
    "Warm lifestyle",
    "Lifestyle",
  ],
  [
    "Marketplace cover",
    "Deal badge and trust cues",
    "1:1 · 1200×1200",
    "Promo graphic",
    "Cover",
  ],
  [
    "Benefit infographic",
    "Evidence-led claim breakdown",
    "1:1 · 1200×1200",
    "Clinical infographic",
    "Optional",
  ],
  [
    "Before / after",
    "Visible ritual comparison",
    "9:16 · 1080×1920",
    "Split-screen proof",
    "Optional",
  ],
] as const;

export default function CampaignWorkspacePage() {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();
  const product = useMemo(() => getMockProduct(projectId), [projectId]);
  const [active, setActive] = useState("brief"),
    [routeId, setRouteId] = useState("route-a"),
    [strategyLocked, setStrategyLocked] = useState(false),
    [generated, setGenerated] = useState(false);
  const route =
    campaignMock.routes.find((item) => item.id === routeId) ??
    campaignMock.routes[0];
  const go = (next: string) => setActive(next);
  return (
    <main className="mx-auto max-w-[1540px] space-y-5 pb-12">
      <div className="flex items-center justify-between text-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/campaigns")}
        >
          <ArrowLeft className="mr-1.5 size-4" />
          All campaigns
        </Button>
        <span className="text-xs text-slate-500">
          Campaign workspace / {product.sku}
        </span>
      </div>
      <CampaignHeader
        product={product}
        generated={generated}
        onGenerate={() => {
          setGenerated(true);
          toast.success(
            "Campaign pack refreshed with the selected creative routes.",
          );
        }}
      />
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl bg-slate-100 p-1.5">
          {steps.map(([id, number, label, Icon]) => (
            <TabsTrigger
              key={id}
              value={id}
              className="min-w-max gap-2 rounded-lg px-3 py-2 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <span className="grid size-5 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                {number}
              </span>
              <Icon className="size-3.5" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {active === "brief" && (
        <BriefTab product={product} onNext={() => go("strategy")} />
      )}
      {active === "strategy" && (
        <StrategyTab
          product={product}
          locked={strategyLocked}
          onLock={() => setStrategyLocked((value) => !value)}
          onNext={() => go("routes")}
        />
      )}
      {active === "routes" && (
        <RoutesTab
          selected={routeId}
          onSelect={setRouteId}
          onNext={() => go("images")}
        />
      )}
      {active === "images" && (
        <ImagesTab product={product} route={route} onNext={() => go("video")} />
      )}
      {active === "video" && (
        <VideoTab product={product} route={route} onNext={() => go("copy")} />
      )}
      {active === "copy" && (
        <CopyTab route={route} onNext={() => go("launch")} />
      )}
      {active === "launch" && <LaunchTab product={product} route={route} />}
    </main>
  );
}

function CampaignHeader({
  product,
  generated,
  onGenerate,
}: {
  product: ReturnType<typeof getMockProduct>;
  generated: boolean;
  onGenerate: () => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
              Draft
            </Badge>
            <Badge
              variant="outline"
              className="border-emerald-200 text-emerald-700"
            >
              <CheckCircle2 className="mr-1 size-3" />
              Claims protected
            </Badge>
            <span className="text-xs text-slate-500">
              7 of 7 launch checks ready
            </span>
          </div>
          <h1 className="mt-2 text-xl font-bold text-slate-950">
            Q3 Barrier Recovery Launch
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {product.name} · Vietnam + US · TikTok Shop, Reels & Meta Feed
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Campaign draft saved.")}
          >
            Save draft
          </Button>
          <Button size="sm" onClick={onGenerate}>
            <Sparkles className="mr-1.5 size-4" />
            {generated ? "Refresh campaign pack" : "Generate campaign pack"}
          </Button>
        </div>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <Status label="Creative strategy" value="Locked source of truth" done />
        <Status
          label="Production matrix"
          value="4 required assets + 2 optional"
          done
        />
        <Status label="A/B experiment" value="Ready to configure" />
      </div>
    </section>
  );
}
function Status({
  label,
  value,
  done,
}: {
  label: string;
  value: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
      <span
        className={`grid size-7 place-items-center rounded-full ${done ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}
      >
        {done ? <Check className="size-4" /> : <Lightbulb className="size-4" />}
      </span>
      <div>
        <p className="text-xs font-semibold text-slate-800">{label}</p>
        <p className="text-[11px] text-slate-500">{value}</p>
      </div>
    </div>
  );
}

function BriefTab({
  product,
  onNext,
}: {
  product: ReturnType<typeof getMockProduct>;
  onNext: () => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
      <div className="space-y-5">
        <Section
          title="Product & commercial brief"
          description="The inputs used by every copy, image and video generation job."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Campaign objective">
              <Input defaultValue="Drive product-page conversions" />
            </Field>
            <Field label="Campaign moment">
              <Input defaultValue="9.9 sale · Post-summer reset" />
            </Field>
            <Field label="Target market">
              <Input defaultValue={product.market} />
            </Field>
            <Field label="Target platforms">
              <Input defaultValue="TikTok Shop, Instagram Reels, Meta Feed" />
            </Field>
            <Field label="Price & offer">
              <Input defaultValue={`${product.price} · ${product.promotion}`} />
            </Field>
            <Field label="Primary audience">
              <Input defaultValue="Working professionals, 22–42" />
            </Field>
          </div>
        </Section>
        <Section
          title="Brand kit & source references"
          description="Lock visual consistency before producing assets."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-dashed border-slate-300 p-4">
              <p className="text-sm font-semibold">Brand expression</p>
              <p className="mt-1 text-xs text-slate-500">
                {product.brand.name} · {product.brand.tone}
              </p>
              <div className="mt-3 flex gap-2">
                {product.brand.colors.map((color) => (
                  <span
                    key={color}
                    className="size-8 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-slate-300 p-4">
              <Upload className="size-4 text-indigo-600" />
              <p className="mt-2 text-sm font-semibold">
                Product references ready
              </p>
              <p className="text-xs text-slate-500">
                {product.assets.length} source assets will anchor the product
                form.
              </p>
            </div>
          </div>
        </Section>
        <Section
          title="Market signal"
          description="Turn real shoppers' context into a specific creative angle."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Trend / search signal">
              <Textarea defaultValue="Barrier recovery, clean clinical skincare, post-summer reset" />
            </Field>
            <Field label="Customer pain point">
              <Textarea defaultValue="I want a credible daily routine that does not feel harsh or complicated." />
            </Field>
            <Field label="Trending keywords">
              <Input defaultValue="niacinamide, lightweight serum, skin barrier" />
            </Field>
            <Field label="Performance data (optional)">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
              >
                <Upload className="mr-2 size-4" />
                Upload past campaign CSV
              </Button>
            </Field>
          </div>
        </Section>
        <Section
          title="Claim guardrails"
          description="Applied to prompts and copy across the entire campaign."
        >
          <div className="grid gap-3 md:grid-cols-2">
            <ClaimBox
              title="Required claims"
              claims={product.requiredClaims}
              tone="emerald"
            />
            <ClaimBox
              title="Restricted wording"
              claims={product.restrictedClaims}
              tone="rose"
            />
          </div>
        </Section>
        <div className="flex justify-end">
          <Button onClick={onNext}>
            Continue to strategy <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
      <Readiness />
    </div>
  );
}

function StrategyTab({
  product,
  locked,
  onLock,
  onNext,
}: {
  product: ReturnType<typeof getMockProduct>;
  locked: boolean;
  onLock: () => void;
  onNext: () => void;
}) {
  const [angle, setAngle] = useState("Problem solver");
  const angles = [
    "Problem solver",
    "Social proof",
    "Transparency",
    "Lifestyle aspiration",
    "Myth-busting",
  ];
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">Strategy & positioning engine</h2>
          <p className="text-sm text-slate-500">
            Choose the source-of-truth angle before generating distinct routes.
          </p>
        </div>
        <Button variant={locked ? "default" : "outline"} onClick={onLock}>
          {locked ? (
            <>
              <Lock className="mr-2 size-4" />
              Strategy locked
            </>
          ) : (
            "Lock strategy"
          )}
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Section
          title="Recommended campaign angle"
          description="Best fit for the stated pain point and sale moment."
        >
          <div className="flex flex-wrap gap-2">
            {angles.map((item) => (
              <button
                type="button"
                onClick={() => setAngle(item)}
                key={item}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${angle === item ? "border-indigo-600 bg-indigo-600 text-white" : "bg-white text-slate-600 hover:border-indigo-300"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-indigo-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">
              Core selling message
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              A calm, evidence-led three-drop ritual for a visibly more
              confident morning.
            </p>
          </div>
        </Section>
        <Section
          title="Target persona"
          description="A mobile-first shopper profile."
        >
          <p className="font-semibold text-slate-900">
            Busy skincare simplifier
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {product.audience} They compare proof, reviews and a deal before
            adding to cart.
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            <Badge variant="outline">Needs ease</Badge>
            <Badge variant="outline">Checks proof</Badge>
            <Badge variant="outline">Responds to bundles</Badge>
          </div>
        </Section>
      </div>
      <Section
        title="Benefit hierarchy"
        description="Every asset must ladder up from proof to an emotional outcome."
      >
        <div className="grid gap-3 md:grid-cols-3">
          <Benefit
            number="01"
            title="Functional benefit"
            text="Lightweight, consistent daily care with a simple routine."
          />
          <Benefit
            number="02"
            title="Reason to believe"
            text="Approved formulation cues: alcohol-free and dermatologist-tested."
          />
          <Benefit
            number="03"
            title="Emotional benefit"
            text="Feel prepared and confident without overthinking your skin."
          />
        </div>
      </Section>
      <div className="flex justify-end">
        <Button onClick={onNext}>
          Build creative routes <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}

function RoutesTab({
  selected,
  onSelect,
  onNext,
}: {
  selected: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  const routeData = [
    {
      ...campaignMock.routes[0],
      framework: "PAS / FAB",
      visual: "Clean studio · macro proof · infographic",
      video: "Problem-solution demo · stress test",
      goal: "CVR & CPA",
    },
    {
      ...campaignMock.routes[1],
      framework: "AIDA / Storytelling",
      visual: "Warm lifestyle · color-pop · UGC",
      video: "POV routine · ASMR unboxing",
      goal: "CTR & 3s retention",
    },
  ];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold">Dual creative routes</h2>
        <p className="text-sm text-slate-500">
          Two independent creative hypotheses — never just a colour or wording
          variation.
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {routeData.map((route, index) => (
          <Card
            key={route.id}
            className={
              selected === route.id
                ? "border-indigo-500 ring-2 ring-indigo-100"
                : ""
            }
          >
            <CardHeader className="border-b bg-slate-50/70">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge
                    className={
                      index === 0
                        ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100"
                        : "bg-cyan-100 text-cyan-700 hover:bg-cyan-100"
                    }
                  >
                    {route.label} ·{" "}
                    {index === 0
                      ? "Rational / Problem-solver"
                      : "Emotional / Lifestyle"}
                  </Badge>
                  <CardTitle className="mt-2 text-lg">{route.name}</CardTitle>
                </div>
                <Button
                  size="sm"
                  variant={selected === route.id ? "default" : "outline"}
                  onClick={() => onSelect(route.id)}
                >
                  {selected === route.id ? (
                    <>
                      <Check className="mr-1 size-3.5" />
                      Selected
                    </>
                  ) : (
                    "Select"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <RouteField label="3-second hook" value={`“${route.hook}”`} />
              <RouteField label="Copy framework" value={route.framework} />
              <RouteField label="Visual direction" value={route.visual} />
              <RouteField label="Video format" value={route.video} />
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                <RouteField label="Primary KPI" value={route.goal} />
                <RouteField label="Platforms" value={route.platform} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <AlertTriangle className="mr-2 inline size-4" />
        <b>Distinctness check passed:</b> the routes change the motivation,
        framework, visual execution and success metric — not only surface
        details.
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext}>
          Create route assets <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}

function ImagesTab({
  product,
  route,
  onNext,
}: {
  product: ReturnType<typeof getMockProduct>;
  route: (typeof campaignMock.routes)[number];
  onNext: () => void;
}) {
  const [activeAsset, setActiveAsset] = useState("Hero image");
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_310px]">
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-lg font-bold">Marketplace image matrix</h2>
            <p className="text-sm text-slate-500">
              Production assets inherit {route.label}&apos;s angle, style and claims.
            </p>
          </div>
          <Badge className="w-fit bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
            {route.label}: {route.name}
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {imageMatrix.map(
            ([title, description, format, style, requirement], index) => (
              <button
                type="button"
                key={title}
                onClick={() => setActiveAsset(title)}
                className={`overflow-hidden rounded-xl border bg-white text-left transition ${activeAsset === title ? "border-indigo-500 ring-2 ring-indigo-100" : "hover:border-slate-400"}`}
              >
                <div className="relative">
                  <img
                    src={
                      product.assets[index % product.assets.length]?.url ??
                      product.image
                    }
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                  <Badge
                    className={`absolute left-2 top-2 ${requirement === "Optional" ? "bg-white/90 text-slate-700 hover:bg-white" : "bg-slate-950/85 text-white hover:bg-slate-950/85"}`}
                  >
                    {requirement}
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{description}</p>
                  <div className="mt-3 flex justify-between text-[11px] text-slate-500">
                    <span>{format}</span>
                    <span>{style}</span>
                  </div>
                </div>
              </button>
            ),
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={onNext}>
            Continue to video <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-base">Asset inspector</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-semibold">{activeAsset}</p>
            <p className="text-xs text-slate-500">
              Seedream 5.0 Pro · route-aware prompt
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            Uses brand colours, product-reference anchor, <b>{route.name}</b>{" "}
            visual direction and restricted-claim exclusions.
          </div>
          <div className="space-y-2">
            <Button
              className="w-full"
              size="sm"
              onClick={() => toast.success(`${activeAsset} regenerated.`)}
            >
              <Sparkles className="mr-1.5 size-4" />
              Regenerate
            </Button>
            <Button
              className="w-full"
              variant="outline"
              size="sm"
              onClick={() =>
                toast.success("Opening the graphic editor is ready to connect.")
              }
            >
              Open in graphic canvas
            </Button>
            <Button className="w-full" variant="ghost" size="sm">
              <Download className="mr-1.5 size-4" />
              Download HD
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VideoTab({
  product,
  route,
  onNext,
}: {
  product: ReturnType<typeof getMockProduct>;
  route: (typeof campaignMock.routes)[number];
  onNext: () => void;
}) {
  const [scene, setScene] = useState(0);
  const type =
    route.id === "route-a" ? "Problem–solution demo" : "POV routine / UGC";
  const scenes = [
    ["0–03s", "Thumb-stop hook", route.hook],
    [
      "03–09s",
      "Product reveal",
      `Reveal ${product.name} in a tactile product shot.`,
    ],
    [
      "09–19s",
      "Proof / experience",
      route.id === "route-a"
        ? "Show texture and an evidence-led benefit cue."
        : "Show the product naturally inside a calming routine.",
    ],
    [
      "19–25s",
      "Deal CTA",
      "Show the launch bundle and ask viewers to tap the cart.",
    ],
  ];
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">Short-form video studio</h2>
          <p className="text-sm text-slate-500">
            {type} · 9:16 vertical · 25 seconds · designed around a 3-second
            retention hook.
          </p>
        </div>
        <Card className="overflow-hidden bg-slate-950 text-white">
          <CardContent className="grid gap-6 p-5 md:grid-cols-[230px_1fr]">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[230px] overflow-hidden rounded-2xl border border-white/20">
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-x-3 top-5 rounded-lg bg-black/75 p-2 text-center text-xs font-bold">
                {scenes[scene][2]}
              </div>
              <div className="absolute inset-x-3 bottom-4 flex items-center justify-between rounded-lg bg-black/80 p-2">
                <span className="text-[10px]">Launch bundle</span>
                <Play className="size-4" />
              </div>
            </div>
            <div>
              <Badge className="bg-purple-400/20 text-purple-200 hover:bg-purple-400/20">
                Seedance 2.5 + Audio 1.0
              </Badge>
              <h3 className="mt-3 text-lg font-bold">
                {route.label}: {route.name}
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Product visibility, caption safety zone and a compliant CTA are
                planned scene by scene.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-4">
                {scenes.map((item, index) => (
                  <button
                    type="button"
                    key={item[0]}
                    onClick={() => setScene(index)}
                    className={`rounded-lg p-2 text-left text-xs ${scene === index ? "bg-white text-slate-950" : "bg-white/10 text-slate-200"}`}
                  >
                    <b>{item[0]}</b>
                    <span className="mt-1 block opacity-70">{item[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Section
          title="Storyboard and production prompt"
          description="Edit the narrative before rendering."
        >
          <div className="space-y-3">
            {scenes.map((item, index) => (
              <button
                type="button"
                onClick={() => setScene(index)}
                key={item[0]}
                className={`w-full rounded-lg border p-3 text-left ${scene === index ? "border-purple-400 bg-purple-50" : "hover:border-slate-400"}`}
              >
                <div className="flex justify-between gap-4">
                  <p className="text-sm font-semibold">
                    Scene {index + 1} · {item[1]}
                  </p>
                  <Badge variant="outline">{item[0]}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-600">{item[2]}</p>
              </button>
            ))}
          </div>
        </Section>
        <div className="flex justify-end">
          <Button onClick={onNext}>
            Continue to copy <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-base">Video controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Video format">
            <Input defaultValue="TikTok / Reels · 9:16 · 25 sec" />
          </Field>
          <Field label="Voiceover">
            <Input defaultValue="Vietnamese · Female, warm commercial" />
          </Field>
          <Field label="Hook pattern">
            <Input
              defaultValue={
                route.id === "route-a"
                  ? "Question / call-out"
                  : "POV identity call-out"
              }
            />
          </Field>
          <div className="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
            <CheckCircle2 className="mr-1 inline size-3.5" />
            Safe zone, product opening and CTA checks passed.
          </div>
          <Button
            className="w-full"
            onClick={() => toast.success("Seedance render job queued.")}
          >
            <Video className="mr-1.5 size-4" />
            Generate video prototype
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CopyTab({
  route,
  onNext,
}: {
  route: (typeof campaignMock.routes)[number];
  onNext: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const framework =
    route.id === "route-a" ? "PAS / FAB" : "AIDA / Storytelling";
  const hooks =
    route.id === "route-a"
      ? [
          "Still covering dark spots with makeup?",
          "A lighter routine starts with one smarter step.",
          "See the proof before you add to cart.",
        ]
      : [
          "Three drops for a calmer-looking morning.",
          "My 30-second reset before a full day.",
          "The ritual that feels as good as it looks.",
        ];
  const handleCopy = () => {
    navigator.clipboard.writeText(campaignMock.copy.primary);
    setCopied(true);
    toast.success("Copy copied in plain text.");
  };
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-bold">Commerce copy suite</h2>
          <p className="text-sm text-slate-500">
            {route.label} uses the {framework} framework with claim-safe
            language.
          </p>
        </div>
        <Button variant="outline" onClick={handleCopy}>
          {copied ? (
            <Check className="mr-1.5 size-4" />
          ) : (
            <Copy className="mr-1.5 size-4" />
          )}
          Copy all
        </Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          <Section
            title="Marketplace listing"
            description="SEO-friendly, mobile-readable and ready for seller portals."
          >
            <Field label="SEO product title">
              <Input defaultValue={campaignMock.copy.title} />
            </Field>
            <Field label="Product description">
              <Textarea
                className="mt-2 min-h-32"
                defaultValue={campaignMock.copy.primary}
              />
            </Field>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                "10% niacinamide daily ritual",
                "Lightweight, non-greasy texture",
                "Alcohol-free formulation",
                "Dermatologist-tested claim",
                "Launch bundle available now",
              ].map((bullet, index) => (
                <div
                  key={bullet}
                  className="flex gap-2 rounded-lg border p-3 text-sm"
                >
                  <span className="font-bold text-indigo-600">
                    0{index + 1}
                  </span>
                  {bullet}
                </div>
              ))}
            </div>
          </Section>
          <Section
            title="Ad caption"
            description="Adapt per placement while retaining the selected route angle."
          >
            <Textarea
              defaultValue={`${campaignMock.copy.primary}\n\n${campaignMock.copy.cta}. #SkinGlow #DailyRitual #TikTokShop`}
              className="min-h-28"
            />
          </Section>
        </div>
        <div className="space-y-5">
          <Section
            title="Short hook library"
            description="For video overlays, headlines and thumb-stop openings."
          >
            <div className="space-y-2">
              {hooks.map((hook, index) => (
                <div key={hook} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[11px] font-bold uppercase text-slate-400">
                    Hook 0{index + 1}
                  </p>
                  <p className="mt-1 text-sm font-medium">“{hook}”</p>
                </div>
              ))}
            </div>
          </Section>
          <Section
            title="Copy compliance"
            description="Pre-flight check before publishing."
          >
            <div className="space-y-2 text-sm">
              <CheckLine text="Includes approved claims only" />
              <CheckLine text="Product, promotion and CTA present" />
              <CheckLine text={`Framework aligned: ${framework}`} />
            </div>
          </Section>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext}>
          Open A/B plan & launch <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}

function LaunchTab({
  product,
  route,
}: {
  product: ReturnType<typeof getMockProduct>;
  route: (typeof campaignMock.routes)[number];
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-bold">A/B plan & campaign launch pack</h2>
          <p className="text-sm text-slate-500">
            Preview delivery, approve the test and export a complete production
            handoff.
          </p>
        </div>
        <Button
          onClick={() =>
            toast.success("Campaign Launch Pack export is being prepared.")
          }
        >
          <Download className="mr-1.5 size-4" />
          Download launch pack (.ZIP)
        </Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Section
          title="A/B test execution plan"
          description="A single meaningful comparison with clear success thresholds."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="border-b text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="pb-3">Variable</th>
                  <th className="pb-3">Route A</th>
                  <th className="pb-3">Route B</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 font-medium">Core angle</td>
                  <td className="py-3">Problem + proof</td>
                  <td className="py-3">Lifestyle + ritual</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Hook</td>
                  <td className="py-3">Pain-point question</td>
                  <td className="py-3">Aspirational routine</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Creative system</td>
                  <td className="py-3">PAS, studio, demo</td>
                  <td className="py-3">AIDA, UGC, POV</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Primary metric</td>
                  <td className="py-3">CVR / CPA</td>
                  <td className="py-3">CTR / 3s retention</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-950">
            <b>Hypothesis:</b> A direct pain-and-proof opening will convert
            proof-seeking shoppers more efficiently; an aspirational routine
            will earn stronger first-3-second retention from discovery
            audiences.
          </div>
        </Section>
        <Section title="Success metrics" description="Set before buying media.">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="CTR" value="≥ 2.5%" />
            <Metric label="3s hold rate" value="≥ 35%" />
            <Metric label="CVR" value="≥ 3.2%" />
            <Metric label="ROAS" value="≥ 3.0×" />
          </div>
        </Section>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Section
          title="Placement preview"
          description="Fast pre-flight review before export."
        >
          <div className="flex gap-3">
            <img
              src={product.image}
              alt=""
              className="size-20 rounded-lg object-cover"
            />
            <div>
              <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                {route.label}
              </Badge>
              <p className="mt-2 text-sm font-semibold">TikTok Shop / Reels</p>
              <p className="text-xs text-slate-500">
                9:16 video · 1:1 cover · marketplace title
              </p>
            </div>
          </div>
        </Section>
        <Section
          title="Performance learning"
          description="Guidance from historical outcomes."
        >
          <div className="space-y-2 text-sm">
            <Learning
              label="KEEP"
              tone="emerald"
              text="Proof-led product details with high ROAS."
            />
            <Learning
              label="CHANGE"
              tone="amber"
              text="Low-retention openings to direct questions."
            />
            <Learning
              label="STOP"
              tone="rose"
              text="Vague benefit claims without evidence."
            />
            <Learning
              label="TEST NEXT"
              tone="indigo"
              text="UGC testimonial versus POV routine."
            />
          </div>
        </Section>
      </div>
      <Section
        title="Launch readiness"
        description="Everything included in the exportable Campaign Launch Pack."
      >
        <div className="grid gap-2 md:grid-cols-4">
          {[
            "Positioning brief",
            "2 creative routes",
            "4 marketplace images",
            "9:16 video + subtitle",
            "SEO listing + captions",
            "A/B execution plan",
            "Claim guardrails",
            "Performance learning",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-lg border bg-slate-50 p-3 text-sm"
            >
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="border-b bg-slate-50/60 py-3.5">
        <CardTitle className="text-base">{title}</CardTitle>
        <p className="text-xs text-slate-500">{description}</p>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-slate-600">{label}</Label>
      {children}
    </div>
  );
}
function ClaimBox({
  title,
  claims,
  tone,
}: {
  title: string;
  claims: string[];
  tone: "emerald" | "rose";
}) {
  const classes =
    tone === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-rose-200 bg-rose-50 text-rose-800";
  return (
    <div className={`rounded-xl border p-4 ${classes}`}>
      <p className="text-xs font-bold uppercase tracking-wide">{title}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {claims.map((claim) => (
          <Badge key={claim} className="bg-white text-slate-700 hover:bg-white">
            {claim}
          </Badge>
        ))}
      </div>
    </div>
  );
}
function Readiness() {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <ClipboardCheck className="size-4 text-indigo-600" />
        <h2 className="font-semibold">Input readiness</h2>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Generation uses the complete brief below.
      </p>
      <div className="mt-4 space-y-3">
        {[
          "Product & offer",
          "Brand & source assets",
          "Claims guardrails",
          "Audience & platform",
          "Market signal",
        ].map((item) => (
          <div className="flex items-center gap-2 text-sm" key={item}>
            <CheckCircle2 className="size-4 text-emerald-600" />
            {item}
          </div>
        ))}
      </div>
      <Button className="mt-5 w-full" size="sm" variant="outline">
        5 / 5 inputs ready
      </Button>
    </aside>
  );
}
function Benefit({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <span className="text-xs font-bold text-indigo-600">{number}</span>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{text}</p>
    </div>
  );
}
function RouteField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-700">{value}</p>
    </div>
  );
}
function CheckLine({ text }: { text: string }) {
  return (
    <p className="flex gap-2">
      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
      {text}
    </p>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
function Learning({
  label,
  tone,
  text,
}: {
  label: string;
  tone: "emerald" | "amber" | "rose" | "indigo";
  text: string;
}) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };
  return (
    <div className="flex gap-2">
      <Badge className={colors[tone]}>{label}</Badge>
      <span>{text}</span>
    </div>
  );
}
