const BRAND = {
  paper: "#f4f1e9",
  paper2: "#ece7db",
  card: "#fffdf8",
  ink: "#17130e",
  muted: "#6f675a",
  accent: "#ff4e1a",
  line: "#e4ddcd",
};

const SITE = "https://ash-labs.tech";
const GITHUB = "https://github.com/Tech-aficionado";
const LINKEDIN = "https://www.linkedin.com/in/shivansh-goel-5b2309174/";

function esc(input: string): string {
  return input.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

function nl2br(input: string): string {
  return esc(input).replace(/\r?\n/g, "<br />");
}

function shell(opts: { preheader: string; eyebrow: string; body: string }): string {
  const { preheader, eyebrow, body } = opts;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background:${BRAND.paper2};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper2};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${BRAND.card};border:1px solid ${BRAND.line};border-radius:20px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
          <!-- accent bar -->
          <tr><td style="height:5px;background:${BRAND.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
          <!-- header -->
          <tr>
            <td style="padding:28px 36px 0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:${BRAND.ink};">
                    Shivansh <span style="color:${BRAND.accent};">&bull;</span>
                  </td>
                  <td align="right" style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};">
                    ${esc(eyebrow)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- body -->
          <tr><td style="padding:16px 36px 36px 36px;">${body}</td></tr>
          <!-- footer -->
          <tr>
            <td style="padding:22px 36px;border-top:1px solid ${BRAND.line};background:${BRAND.paper};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:${BRAND.muted};">
                    &copy; ${new Date().getFullYear()} Shivansh Goel
                  </td>
                  <td align="right" style="font-size:12px;">
                    <a href="${SITE}" style="color:${BRAND.accent};text-decoration:none;">ash-labs.tech</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:${BRAND.muted};">
          Sent from the contact form at ash-labs.tech
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${BRAND.ink};color:${BRAND.paper};text-decoration:none;font-size:14px;font-weight:600;padding:13px 26px;border-radius:999px;">${esc(label)}</a>`;
}

export function notificationEmail(d: { name: string; email: string; message: string }): string {
  const body = `
    <h1 style="margin:14px 0 6px;font-family:Georgia,serif;font-size:30px;line-height:1.15;color:${BRAND.ink};font-weight:normal;">
      New message from<br /><span style="font-style:italic;color:${BRAND.accent};">${esc(d.name)}</span>
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:${BRAND.muted};">Someone just reached out through your portfolio.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};border:1px solid ${BRAND.line};border-radius:14px;">
      <tr>
        <td style="padding:18px 20px;border-bottom:1px solid ${BRAND.line};">
          <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};">From</div>
          <div style="font-size:16px;color:${BRAND.ink};font-weight:600;margin-top:3px;">${esc(d.name)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 20px;border-bottom:1px solid ${BRAND.line};">
          <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};">Email</div>
          <a href="mailto:${esc(d.email)}" style="font-size:16px;color:${BRAND.accent};text-decoration:none;margin-top:3px;display:inline-block;">${esc(d.email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 20px;">
          <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};">Message</div>
          <div style="font-size:15px;color:${BRAND.ink};line-height:1.6;margin-top:6px;">${nl2br(d.message)}</div>
        </td>
      </tr>
    </table>

    <div style="margin-top:24px;">
      ${button(`mailto:${esc(d.email)}?subject=${encodeURIComponent("Re: your message")}`, `Reply to ${d.name.split(" ")[0]}`)}
    </div>`;
  return shell({
    preheader: `${d.name} sent you a message: ${d.message.slice(0, 60)}`,
    eyebrow: "Portfolio · New message",
    body,
  });
}

export function receiptEmail(d: { name: string; message: string }): string {
  const first = d.name.split(" ")[0];
  const body = `
    <h1 style="margin:14px 0 6px;font-family:Georgia,serif;font-size:30px;line-height:1.15;color:${BRAND.ink};font-weight:normal;">
      Thanks for reaching out,<br /><span style="font-style:italic;color:${BRAND.accent};">${esc(first)}!</span>
    </h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
      I&rsquo;ve received your message and I&rsquo;ll get back to you within a day or two.
      Here&rsquo;s a copy for your records:
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};border-left:3px solid ${BRAND.accent};border-radius:8px;">
      <tr>
        <td style="padding:18px 20px;font-size:15px;color:${BRAND.ink};line-height:1.6;font-style:italic;">
          &ldquo;${nl2br(d.message)}&rdquo;
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 20px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
      In the meantime, feel free to explore my work or connect with me.
    </p>

    <div style="margin-bottom:26px;">
      ${button(SITE, "View portfolio")}
      &nbsp;
      <a href="${GITHUB}" style="display:inline-block;border:1px solid ${BRAND.line};color:${BRAND.ink};text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:999px;">GitHub</a>
      &nbsp;
      <a href="${LINKEDIN}" style="display:inline-block;border:1px solid ${BRAND.line};color:${BRAND.ink};text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:999px;">LinkedIn</a>
    </div>

    <p style="margin:0;font-size:15px;color:${BRAND.ink};">
      Warmly,<br />
      <span style="font-family:Georgia,serif;font-size:18px;">Shivansh Goel</span><br />
      <span style="font-size:13px;color:${BRAND.muted};">Full Stack Developer</span>
    </p>`;
  return shell({
    preheader: `Thanks ${first} — I received your message and will reply soon.`,
    eyebrow: "Shivansh Goel",
    body,
  });
}
