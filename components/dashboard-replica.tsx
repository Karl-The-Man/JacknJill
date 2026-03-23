"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Banknote,
  Briefcase,
  Building2,
  CircleCheck,
  CircleHelp,
  CircleX,
  Eye,
  ExternalLink,
  Gift,
  Globe,
  House,
  Inbox,
  MapPin,
  MessageCircleHeart,
  MessageSquare,
  Paperclip,
  Phone,
  Settings,
  UserPen,
  Wrench
} from "lucide-react";

type OpportunityTabId =
  | "jack"
  | "role"
  | "location"
  | "compensation"
  | "skills"
  | "culture";

type OpportunityTone = "green" | "yellow";

type OpportunityTab = {
  id: OpportunityTabId;
  label: string;
  icon: LucideIcon;
  panelTitle: string;
  body?: string;
  bullets?: string[];
  tone?: OpportunityTone;
};

type JobOpportunity = {
  id: string;
  company: string;
  roleTitle: string;
  postedLabel: string;
  logoSrc: string;
  logoAlt: string;
  websiteHref: string;
  jobPostHref: string;
  tabs: Record<OpportunityTabId, OpportunityTab>;
};

const opportunityTabOrder: OpportunityTabId[] = [
  "jack",
  "role",
  "location",
  "compensation",
  "skills",
  "culture"
];

const jobOpportunities: JobOpportunity[] = [
  {
    id: "uplane",
    company: "Uplane",
    roleTitle: "Founding AI Engineer",
    postedLabel: "Posted last month",
    logoSrc: "/uplane-logo.jpg",
    logoAlt: "Uplane logo",
    websiteHref: "https://uplane.com/",
    jobPostHref:
      "https://jobs.ashbyhq.com/uplane/4d643fab-1e42-4f07-b28a-d3a2ec181bc5?utm_source=jackandjill",
    tabs: {
      jack: {
        id: "jack",
        label: "Jack",
        icon: MessageSquare,
        panelTitle: "Summary",
        bullets: [
          "Uplane builds AI for marketing budget optimization. You'd be a Founding AI Engineer solving a massive problem.",
          "Your AI focus and bootstrapping experience are ideal for this Founding Engineer role.",
          "Confirm SF base salary range and specific equity details for this Founding role."
        ]
      },
      role: {
        id: "role",
        label: "Role",
        icon: Briefcase,
        panelTitle: "Excellent on role",
        body: "Founding AI Engineer role with full ownership aligns with candidate's search for early-stage impact."
      },
      location: {
        id: "location",
        label: "San Francisco · Onsite",
        icon: MapPin,
        panelTitle: "Excellent on location",
        body: "Role is in San Francisco, a top choice location, with relocation and visa sponsorship provided."
      },
      compensation: {
        id: "compensation",
        label: "est. $90k - $110k",
        icon: Banknote,
        panelTitle: "Good on compensation",
        body: "SF base salary range is not specified, but relocation support and visa sponsorship align with search criteria."
      },
      skills: {
        id: "skills",
        label: "Skills",
        icon: Wrench,
        panelTitle: "Excellent on skills",
        body: "Role requires AI/ML, backend (Node.js, TS, PostgreSQL), aligning with candidate's skills and AI focus."
      },
      culture: {
        id: "culture",
        label: "Culture",
        icon: Building2,
        panelTitle: "Excellent on culture",
        body: "Early-stage (YC F25), fast-moving startup culture aligns with candidate's high-intensity preference."
      }
    }
  },
  {
    id: "plato",
    company: "Plato",
    roleTitle: "Full-Stack Typescript Product Engineer",
    postedLabel: "Posted last month",
    logoSrc: "/platoapp.jpeg",
    logoAlt: "Plato logo",
    websiteHref: "https://platoapp.com/",
    jobPostHref: "https://platoapp.com/careers",
    tabs: {
      jack: {
        id: "jack",
        label: "Jack",
        icon: MessageSquare,
        panelTitle: "Summary",
        tone: "yellow",
        bullets: [
          "AI-powered wholesale platform, you'd build the core UX/UI of a category-defining SaaS product.",
          "Full-stack TS/React experience and AI focus align with building Plato's core application.",
          "Relocation/visa support and specific salary/equity details are not listed."
        ]
      },
      role: {
        id: "role",
        label: "Role",
        icon: Briefcase,
        panelTitle: "Excellent on role",
        body: "Founding Engineer role aligns perfectly with candidate's desired title and early-stage focus."
      },
      location: {
        id: "location",
        label: "Berlin · Hybrid",
        icon: MapPin,
        panelTitle: "Good on location",
        body: "Berlin-based role aligns with secondary location preference; relocation and visa sponsorship are not explicitly mentioned."
      },
      compensation: {
        id: "compensation",
        label: "est. £60k - £80k",
        icon: Banknote,
        panelTitle: "Borderline on compensation",
        tone: "yellow",
        body: "Base salary range not disclosed, equity is mentioned but not quantified."
      },
      skills: {
        id: "skills",
        label: "Skills",
        icon: Wrench,
        panelTitle: "Excellent on skills",
        body: "Role requires full-stack TypeScript/React, PostgreSQL, and systems thinking, matching candidate's stated skills and experience."
      },
      culture: {
        id: "culture",
        label: "Culture",
        icon: Building2,
        panelTitle: "Excellent on culture",
        body: "Early-stage (Seed/Series A implied by VC backing), demanding workload (implied by 'rocket ship', 'push hard', 'adventurous and demanding road'), and high-potential founders ('top-tier investors', 'elite investors')."
      }
    }
  },
  {
    id: "jack-and-jill",
    company: "Jack & Jill",
    roleTitle: "Founding Engineer",
    postedLabel: "Posted recently",
    logoSrc: "/brand-logo.png",
    logoAlt: "Jack & Jill logo",
    websiteHref: "https://jackandjill.ai/",
    jobPostHref: "https://jackandjill.ai/",
    tabs: {
      jack: {
        id: "jack",
        label: "Jack",
        icon: MessageSquare,
        panelTitle: "Summary",
        bullets: [
          "Jack & Jill is building AI agents for both candidates and companies, aiming to become the default infrastructure for the future labor market.",
          "Founding Engineer role offers unusually high leverage: real product ownership, elite founders, fast growth, and strong early traction.",
          "This is a high-intensity, high-agency environment with exceptional upside and is exactly the kind of ambitious in-person builder setup the candidate wants."
        ]
      },
      role: {
        id: "role",
        label: "Role",
        icon: Briefcase,
        panelTitle: "Excellent on role",
        body: "Founding Engineer title, deep ownership, product building at the application layer, and direct proximity to elite founders make this an exceptional fit for the candidate’s goals."
      },
      location: {
        id: "location",
        label: "London · Onsite",
        icon: MapPin,
        panelTitle: "Excellent on location",
        body: "Shoreditch-based, fully in-person work is a perfect match for the candidate’s preference for London and close collaboration with high-caliber builders."
      },
      compensation: {
        id: "compensation",
        label: "£240k+ total comp",
        icon: Banknote,
        panelTitle: "Excellent on compensation",
        body: "£240k+ total compensation with flexible cash/equity split is exceptional for a Founding Engineer role and strongly matches the candidate’s target upside."
      },
      skills: {
        id: "skills",
        label: "Skills",
        icon: Wrench,
        panelTitle: "Excellent on skills",
        body: "Product-focused engineering across Next.js, TypeScript, Python/FastAPI, PostgreSQL, and fast iteration aligns extremely well with the candidate’s AI-native, full-stack, early-stage builder profile."
      },
      culture: {
        id: "culture",
        label: "Culture",
        icon: Building2,
        panelTitle: "Excellent on culture",
        body: "Breakneck speed, high standards, founder-heavy team, in-person intensity, and ambition to redefine a massive market make this an exceptional cultural fit for the candidate."
      }
    }
  }
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function HeaderIconButton({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" className={cx("header-icon-button", className)}>
      {children}
    </button>
  );
}

function MessageBubble({
  align,
  children,
  compact = false
}: {
  align: "left" | "right";
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={cx("chat-row", align === "right" && "chat-row-right")}>
      <div
        className={cx(
          "message-bubble",
          align === "right" ? "message-user" : "message-assistant",
          compact && "message-compact"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ToolBadge({
  icon: Icon,
  label,
  tone
}: {
  icon: LucideIcon;
  label: string;
  tone: "green" | "red";
}) {
  return (
    <div className={cx("tool-badge", tone === "green" ? "tool-green" : "tool-red")}>
      <Icon className="tool-badge-icon" />
      <span>{label}</span>
    </div>
  );
}

function SearchCompleteCard() {
  return (
    <div className="search-complete-card">
      <div className="search-complete-header">
        <span className="search-check">
          <CircleCheck className="search-check-icon" />
        </span>
        <h3>Search complete</h3>
      </div>
      <div className="search-complete-body">
        <div className="search-progress-track">
          <div className="search-progress-fill" />
        </div>
        <p>Found matching jobs</p>
      </div>
    </div>
  );
}

function ComposerAction({
  icon: Icon,
  label,
  filled = false,
  round = false
}: {
  icon: LucideIcon;
  label?: string;
  filled?: boolean;
  round?: boolean;
}) {
  return (
    <button
      type="button"
      className={cx(
        "composer-action",
        filled && "composer-action-filled",
        round && "composer-action-round",
        !label && "composer-action-icon-only"
      )}
    >
      <Icon className="composer-action-icon" />
      {label ? <span>{label}</span> : null}
    </button>
  );
}

function SectionTab({
  icon: Icon,
  label,
  active = false,
  count,
  hideLabelOnSmall = false
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  count?: string;
  hideLabelOnSmall?: boolean;
}) {
  return (
    <button type="button" className={cx("section-tab", active && "section-tab-active")}>
      <Icon className="section-tab-icon" />
      <span className={hideLabelOnSmall ? "section-tab-label-optional" : undefined}>
        {label}
      </span>
      {count ? (
        <span className={cx("section-tab-count", active && "section-tab-count-active")}>
          {count}
        </span>
      ) : null}
    </button>
  );
}

function JobsSubTab({
  icon: Icon,
  label,
  count,
  active = false
}: {
  icon: LucideIcon;
  label: string;
  count?: string;
  active?: boolean;
}) {
  return (
    <button type="button" className={cx("jobs-subtab", active && "jobs-subtab-active")}>
      <Icon className="jobs-subtab-icon" />
      <span>{label}</span>
      {count ? (
        <span className={cx("jobs-subtab-count", active && "jobs-subtab-count-active")}>
          {count}
        </span>
      ) : null}
    </button>
  );
}

function JobActionLink({
  href,
  icon: Icon,
  label,
  primary = false
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cx("job-action-link", primary && "job-action-link-primary")}
    >
      <Icon className="job-action-link-icon" />
      <span>{label}</span>
    </a>
  );
}

function OpportunityPill({
  tab,
  active,
  onSelect
}: {
  tab: OpportunityTab;
  active: boolean;
  onSelect: (tabId: OpportunityTabId) => void;
}) {
  const Icon = tab.icon;

  return (
    <button
      type="button"
      className={cx(
        "opportunity-pill",
        tab.tone === "yellow" && "opportunity-pill-yellow",
        active && "opportunity-pill-active",
        active && tab.tone === "yellow" && "opportunity-pill-active-yellow"
      )}
      onClick={() => onSelect(tab.id)}
      aria-pressed={active}
    >
      <Icon className="opportunity-pill-icon" />
      <span>{tab.label}</span>
    </button>
  );
}

function OpportunityPanel({ tab }: { tab: OpportunityTab }) {
  const Icon = tab.icon;

  return (
    <div key={tab.id} className="opportunity-panel-content">
      <Icon className="opportunity-panel-icon" />
      <div className="opportunity-panel-copy">
        <h4>{tab.panelTitle}</h4>
        {tab.bullets ? (
          <ul className="opportunity-summary-list">
            {tab.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : (
          <p>{tab.body}</p>
        )}
      </div>
    </div>
  );
}

function JobCard({ job }: { job: JobOpportunity }) {
  const [activeTab, setActiveTab] = useState<OpportunityTabId>("jack");
  const [panelHeight, setPanelHeight] = useState<number | null>(null);
  const panelContentRef = useRef<HTMLDivElement>(null);
  const activeOpportunity = job.tabs[activeTab];

  useLayoutEffect(() => {
    const node = panelContentRef.current;

    if (!node) {
      return;
    }

    const updateHeight = () => {
      setPanelHeight(node.offsetHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [activeTab]);

  return (
    <article className="job-card opportunity-card opportunity-card-enter">
      <div className="opportunity-card-header">
        <div className="opportunity-card-heading">
          <div className="job-logo-tile opportunity-logo-tile">
            <Image
              src={job.logoSrc}
              alt={job.logoAlt}
              width={40}
              height={40}
              className="job-logo-image"
              priority
            />
          </div>

          <div className="opportunity-meta">
            <p className="opportunity-company-name">{job.company}</p>
            <div className="opportunity-role-line">
              <span>{job.roleTitle}</span>
              <span className="opportunity-meta-separator">·</span>
              <span>{job.postedLabel}</span>
            </div>
          </div>
        </div>

        <div className="opportunity-card-actions">
          <JobActionLink href={job.websiteHref} icon={Globe} label="Website" />
          <JobActionLink
            href={job.jobPostHref}
            icon={ExternalLink}
            label="Job Post"
            primary
          />
        </div>
      </div>

      <div className="opportunity-pill-row">
        {opportunityTabOrder.map((tabId) => (
          <OpportunityPill
            key={tabId}
            tab={job.tabs[tabId]}
            active={activeTab === tabId}
            onSelect={setActiveTab}
          />
        ))}
      </div>

      <div
        className={cx("opportunity-panel", activeOpportunity.tone === "yellow" && "opportunity-panel-yellow")}
        style={{ height: panelHeight ? `${panelHeight}px` : "auto" }}
      >
        <div ref={panelContentRef} className="opportunity-panel-measure">
          <OpportunityPanel key={activeTab} tab={activeOpportunity} />
        </div>
      </div>
    </article>
  );
}

function FooterActionButton({
  icon: Icon,
  label,
  variant,
  onClick
}: {
  icon: LucideIcon;
  label: string;
  variant: "secondary" | "neutral" | "primary";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "footer-action-button",
        variant === "secondary" && "footer-action-button-secondary",
        variant === "neutral" && "footer-action-button-neutral",
        variant === "primary" && "footer-action-button-primary"
      )}
    >
      <Icon className="footer-action-icon" />
      <span>{label}</span>
    </button>
  );
}

export function DashboardReplica() {
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const activeJob = jobOpportunities[currentJobIndex];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = 92;
    }
  }, []);

  const advanceJobCard = () => {
    setCurrentJobIndex((currentIndex) => (currentIndex + 1) % jobOpportunities.length);
  };

  return (
    <div className="dashboard-shell">
      <header className="top-header">
        <div className="top-header-spacer" />
        <div className="brand-lockup">
          <Image src="/brand-logo.png" alt="Jack & Jill" width={170} height={32} priority />
        </div>
        <div className="top-header-actions">
          <button type="button" className="referrals-button">
            <Gift className="referrals-icon" />
            <span>Referrals</span>
          </button>
          <HeaderIconButton>
            <Settings className="header-icon" />
          </HeaderIconButton>
          <HeaderIconButton>
            <CircleHelp className="header-icon" />
          </HeaderIconButton>
          <HeaderIconButton className="avatar-button">
            <Image src="/avatar.jpg" alt="Karl Vikat" width={32} height={32} className="avatar-image" />
          </HeaderIconButton>
        </div>
      </header>

      <div className="dashboard-body">
        <section className="chat-panel">
          <div className="chat-scroll" ref={chatScrollRef}>
            <div className="chat-overlay-top" />
            <div className="chat-scroll-inner">
              <div className="chat-top-spacer" />
              <MessageBubble align="left">
                <div className="message-stack">
                  <p>
                    I can definitely help with that. Since you&apos;re targeting high-intensity
                    startups across London, SF, and Europe, the ranges can shift quite a bit.
                  </p>
                  <p>
                    To give you an accurate benchmark, which location and role should we focus on
                    first? (e.g. Founding Engineer in London vs. Backend in SF)
                  </p>
                </div>
              </MessageBubble>

              <MessageBubble align="right" compact>
                <span>Lets do Stockholm, London and Berlin</span>
              </MessageBubble>

              <div className="chat-inline-tools">
                <ToolBadge icon={CircleX} label="Create salary onboarding checklist" tone="red" />
              </div>

              <div className="chat-card-row">
                <SearchCompleteCard />
              </div>

              <MessageBubble align="left">
                <div className="message-stack">
                  <p>Got it. Stockholm, London, and Berlin.</p>
                  <p>
                    To make this as accurate as possible, should we assume a <strong>Founding
                    Engineer</strong> role at a Seed/Series A startup? That&apos;s usually where
                    you&apos;ll see the highest equity-to-cash variance.
                  </p>
                  <p>I&apos;m pulling some current data for those hubs now.</p>
                </div>
              </MessageBubble>

              <MessageBubble align="right" compact>
                <span>yes</span>
              </MessageBubble>

              <div className="chat-inline-tools">
                <ToolBadge icon={CircleCheck} label="Web search (2)" tone="green" />
              </div>

              <MessageBubble align="left">
                <div className="message-stack">
                  <p>
                    Perfect. Focusing on Founding Engineer roles at Seed/Series A startups gives us
                    a clear baseline.
                  </p>
                  <p>
                    While I pull together the exact numbers for Stockholm and Berlin, here&apos;s a
                    quick preview based on the London data I&apos;m seeing:
                  </p>
                  <ul className="chat-bullet-list">
                    <li>
                      <strong>London</strong>: Usually looks like <strong>£65k–£85k</strong> base
                      with <strong>1.0%–2.5%</strong> equity for a founding hire.
                    </li>
                    <li>
                      <strong>Stockholm/Berlin</strong>: Typically slightly lower base (often
                      <strong> €60k–€75k</strong>) but can sometimes offer more aggressive equity if
                      the team is still sub-5 people.
                    </li>
                  </ul>
                  <p>
                    I&apos;m doing a deeper dive into current listings in Stockholm and Berlin right
                    now to see if those ranges have shifted recently. I&apos;ll have the full
                    breakdown for you in a moment.
                  </p>
                </div>
              </MessageBubble>
              <div className="chat-bottom-spacer" />
            </div>
          </div>

          <div className="chat-composer-wrap">
            <div className="chat-composer">
              <span className="chat-composer-placeholder">Press space to speak</span>
              <div className="chat-composer-actions">
                <div className="chat-composer-actions-left">
                  <ComposerAction icon={Paperclip} round />
                  <ComposerAction icon={MessageCircleHeart} label="Coaching" />
                </div>
                <div className="chat-composer-actions-right">
                  <ComposerAction icon={Phone} round />
                  <ComposerAction icon={AudioLines} filled round />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="panel-divider" />

        <section className="jobs-panel">
          <div className="jobs-panel-topnav">
            <SectionTab icon={House} label="Home" hideLabelOnSmall />
            <SectionTab icon={Inbox} label="Jobs" active count="36" />
            <SectionTab icon={UserPen} label="Profile" />
            <SectionTab icon={Briefcase} label="Jack's Brief" />
          </div>

          <div className="jobs-surface">
            <div className="jobs-surface-header">
              <div className="jobs-subtabs">
                <JobsSubTab icon={Inbox} label="New" count="36" active />
                <JobsSubTab icon={Eye} label="Tracking" count="9" />
                <JobsSubTab icon={Archive} label="Archived" count="1" />
              </div>

              <div className="jobs-counter-wrap">
                <div className="jobs-dots">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <span
                      key={index}
                      className={cx("jobs-dot", index === currentJobIndex && "jobs-dot-active")}
                    />
                  ))}
                  <span className="jobs-plus-count">+26</span>
                </div>
                <span className="jobs-total-count">{currentJobIndex + 1} of 36</span>
              </div>
            </div>

            <div className="jobs-surface-body">
              <div className="jobs-card-stage">
                <JobCard key={activeJob.id} job={activeJob} />
              </div>
            </div>

            <footer className="jobs-surface-footer">
              <div className="jobs-footer-actions">
                <FooterActionButton
                  icon={ArrowLeft}
                  label="Not for me"
                  variant="secondary"
                  onClick={advanceJobCard}
                />
                <FooterActionButton
                  icon={ArrowDown}
                  label="Skip"
                  variant="neutral"
                  onClick={advanceJobCard}
                />
                <FooterActionButton
                  icon={ArrowRight}
                  label="Interested"
                  variant="primary"
                  onClick={advanceJobCard}
                />
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
