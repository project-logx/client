import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import WorkflowSection from "../../components/sections/WorkflowSection";

const WorkflowPage = () => {
  return (
    <PageShell
      eyebrow="Workflow"
      title="A calmer way to move from signal to decision."
      description="Logx keeps the sequence simple: scan, score, and act without burying the trader in noise or extra screens."
    >
      <WorkflowSection />
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
          to="/"
        >
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </PageShell>
  );
};

export default WorkflowPage;
