import { workflow } from "../../data/homeData";

const WorkflowSection = () => {
  return (
    <section
      id="workflow"
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
            Workflow
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Designed to keep the signal centered and the interface calm.
          </h2>
          <p className="mt-4 max-w-xl font-light text-slate-300">
            A focused experience matters when the market is moving quickly. Logx
            keeps the layout clean, the controls easy to reach, and the analysis
            readable on every screen size.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
          {workflow.map((step, index) => (
            <div key={step} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
                0{index + 1}
              </div>
              <div>
                <div className="text-lg font-medium text-white">{step}</div>
                <div className="mt-1 text-sm font-light leading-6 text-slate-400">
                  Keep the workflow simple so traders can spend more time
                  evaluating setups and less time decoding the UI.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
