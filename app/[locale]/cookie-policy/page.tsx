import { siteConfig } from '@/lib/config';

export default function CookiePolicy() {
  return (
    <div className="container mx-auto py-24 px-4 md:px-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mb-12">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
        <p>
          This Cookie Policy explains how {siteConfig.name} ("we", "us", and
          "our") uses cookies and similar technologies to recognize you when you visit our
          website. It explains what these technologies are and why we use them, as well as your
          rights to control our use of them.
        </p>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            What are cookies?
          </h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you
            visit a website. Cookies are widely used by website owners in order to make their
            websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            Types of cookies we use
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through
                our Website and to use some of its features, such as access to secure areas.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us
                understand how our Website is being used or how effective our marketing campaigns
                are, or to help us customize our Website for you.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            How can I control cookies?
          </h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your
            cookie rights by setting your preferences in the Cookie Consent Banner. The Cookie
            Consent Banner allows you to select which categories of cookies you accept or reject.
            Essential cookies cannot be rejected as they are strictly necessary to provide you with
            services.
          </p>
          <p className="mt-4">
            You can also set or amend your web browser controls to accept or refuse cookies. If you
            choose to reject cookies, you may still use our website though your access to some
            functionality and areas of our website may be restricted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            Changes to this Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example,
            changes to the cookies we use or for other operational, legal or regulatory reasons.
            Please therefore re-visit this Cookie Policy regularly to stay informed about our use of
            cookies and related technologies.
          </p>
        </section>
      </div>
    </div>
  );
}
