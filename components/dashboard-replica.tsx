"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Banknote,
  Briefcase,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  CircleX,
  Earth,
  ExternalLink,
  Eye,
  Gift,
  House,
  Inbox,
  Keyboard,
  MapPin,
  MessageCircleHeart,
  Paperclip,
  Phone,
  Settings,
  UserPen,
  X
} from "lucide-react";

type Insight = {
  title: string;
  body: string;
};

type ChipProps = {
  icon: LucideIcon;
  label: string;
  dotted?: boolean;
  italic?: boolean;
};

const jobInsights: Insight[] = [
  {
    title: "The Headlines",
    body: "watchTowr builds preemptive exposure management tech. You'd lead backend design for critical vulnerability data at scale."
  },
  {
    title: "Why is this a fit",
    body: "Your backend skills and full-stack MVP experience are ideal for this lead backend engineering role."
  },
  {
    title: "What to watch out for",
    body: "Confirm relocation assistance and specific salary/equity details for London-based role."
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
      {count ? <span className={cx("section-tab-count", active && "section-tab-count-active")}>{count}</span> : null}
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
      {count ? <span className={cx("jobs-subtab-count", active && "jobs-subtab-count-active")}>{count}</span> : null}
    </button>
  );
}

function IconRing({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="chip-icon-ring">
      <span className="chip-icon-inner">
        <Icon className="chip-icon" />
      </span>
    </span>
  );
}

function InfoChip({ icon, label, dotted = false, italic = false }: ChipProps) {
  return (
    <div className={cx("info-chip", dotted && "info-chip-dotted", italic && "info-chip-italic")}>
      <IconRing icon={icon} />
      <span>{label}</span>
    </div>
  );
}

function InsightBlock({ title, body }: Insight) {
  return (
    <div className="insight-block">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
}

function JobHeader() {
  return (
    <div className="job-header">
      <div className="job-logo-tile">
        <Image
          src="/watchtowr-logo.jpg"
          alt="watchTowr logo"
          width={64}
          height={64}
          className="job-logo-image"
          priority
        />
      </div>
      <div className="job-header-copy">
        <div className="job-title-row">
          <h2>Backend Engineer</h2>
          <button type="button" className="job-link-button" aria-label="External link">
            <ExternalLink className="job-link-icon" />
          </button>
        </div>
        <div className="job-meta">
          <span>watchTowr</span>
          <span className="job-meta-separator">·</span>
          <span>Posted yesterday</span>
          <span className="job-meta-separator">·</span>
          <span className="job-web-source">
            <Earth className="job-web-icon" />
            <span>Web-sourced</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function JobDescriptionPreview() {
  return (
    <div className="job-description-preview">
      <h4>Job Description</h4>
      <div className="job-preview-content">
        <p>Hello, let us introduce ourselves!</p>
        <p>
          watchTowr is the Preemptive Exposure Management capability trusted by Fortune 500
          companies and critical infrastructure providers.
        </p>
        <p>
          By combining proactive threat intelligence, real attacker telemetry, and automated red
          teaming, watchTowr continuously identifies and validates real exposure so security teams
          can outrun real-world threats.
        </p>
      </div>
      <div className="job-preview-fade" />
      <button type="button" className="view-more-button">
        <ChevronDown className="view-more-icon" />
        <span>View more</span>
      </button>
    </div>
  );
}

function JobCard() {
  return (
    <article className="job-card">
      <JobHeader />
      <div className="job-chip-row">
        <InfoChip icon={MapPin} label="London · Onsite" />
        <InfoChip icon={Banknote} label="est. £70k - £90k" dotted italic />
      </div>
      <div className="job-insights">
        {jobInsights.map((insight) => (
          <InsightBlock key={insight.title} {...insight} />
        ))}
      </div>
      <div className="job-divider" />
      <JobDescriptionPreview />
    </article>
  );
}

function FooterActionButton({
  icon: Icon,
  label,
  primary = false
}: {
  icon: LucideIcon;
  label: string;
  primary?: boolean;
}) {
  return (
    <button type="button" className={cx("footer-action-button", primary && "footer-action-button-primary")}>
      <Icon className="footer-action-icon" />
      <span>{label}</span>
    </button>
  );
}

export function DashboardReplica() {
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = 92;
    }
  }, []);

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

        <div className="panel-divider">
          <button type="button" className="divider-handle" aria-label="Previous job">
            <ArrowLeft className="divider-handle-icon" />
          </button>
        </div>

        <section className="jobs-panel">
          <div className="jobs-panel-topnav">
            <SectionTab icon={House} label="Home" hideLabelOnSmall />
            <SectionTab icon={Inbox} label="Jobs" active count="42" />
            <SectionTab icon={UserPen} label="Profile" />
            <SectionTab icon={Briefcase} label="Jack's Brief" />
          </div>

          <div className="jobs-surface">
            <div className="jobs-surface-header">
              <div className="jobs-subtabs">
                <JobsSubTab icon={Inbox} label="New" count="42" active />
                <JobsSubTab icon={Eye} label="Tracking" count="4" />
                <JobsSubTab icon={Archive} label="Archived" />
              </div>

              <div className="jobs-counter-wrap">
                <div className="jobs-dots">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <span
                      key={index}
                      className={cx("jobs-dot", index === 9 && "jobs-dot-active")}
                    />
                  ))}
                  <span className="jobs-plus-count">+32</span>
                </div>
                <span className="jobs-total-count">34 of 42</span>
              </div>
            </div>

            <div className="jobs-surface-body">
              <button type="button" className="jobs-edge-arrow" aria-label="Next job">
                <ArrowRight className="jobs-edge-arrow-icon" />
              </button>
              <div className="jobs-card-stage">
                <JobCard />
              </div>
            </div>

            <footer className="jobs-surface-footer">
              <div className="jobs-footer-actions">
                <FooterActionButton icon={X} label="Skip" />
                <FooterActionButton icon={Eye} label="Track" primary />
              </div>
              <div className="jobs-footer-shortcuts">
                <div className="shortcut-heading">
                  <Keyboard className="shortcut-keyboard-icon" />
                  <span>Shortcuts:</span>
                </div>
                <div className="shortcut-group">
                  <span className="shortcut-pill">←</span>
                  <span className="shortcut-pill">→</span>
                  <span>Navigate</span>
                </div>
                <div className="shortcut-group">
                  <span className="shortcut-pill">S</span>
                  <span>Skip</span>
                </div>
                <div className="shortcut-group">
                  <span className="shortcut-pill">T</span>
                  <span>Track</span>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
