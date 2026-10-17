/**
 * Tailored Cover Letter Generator for CANDIDATE.ph
 * Crafts concise, high-converting recruiter pitches and executive cover letters
 * tailored specifically to the target role, company, industry, and matching tech stack.
 * All included in the ₱50 Quick Apply fee.
 */

export const COVER_LETTER_TONES = [
  { id: 'technical', label: 'Technical & Direct', description: 'Emphasizes stack mastery, clean architecture, and zero-ramp-up speed.' },
  { id: 'impact', label: 'Metrics & Results', description: 'Highlights measurable business outcomes, scale, and product velocity.' },
  { id: 'mission', label: 'Mission & Culture', description: 'Focuses on company alignment, engineering values, and user impact.' }
];

export function generateTailoredCoverLetter(job, user, tone = 'technical') {
  const candidateName = user?.name || 'Juan Dela Cruz';
  const candidateEmail = user?.email || 'juan.delacruz@email.com';
  const candidatePhone = user?.phone || '+63 917 555 0192';
  const candidateLocation = user?.location || 'Metro Manila, Philippines';
  
  const companyName = job?.company || 'Target Company';
  const jobTitle = job?.title || 'Senior Software Engineer';
  const industry = job?.industry || 'Technology';
  const stack = job?.matchingSkills?.length 
    ? job.matchingSkills.join(', ') 
    : 'React, TypeScript, Next.js, and modern cloud architectures';
  const yearsExp = user?.experienceYears || 6;

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  let opening = '';
  let body1 = '';
  let body2 = '';
  let closing = '';

  if (tone === 'technical') {
    opening = `I am writing to express my immediate interest in the ${jobTitle} opening at ${companyName}. With over ${yearsExp} years of hands-on experience building high-throughput web applications and specialized expertise in ${stack}, I am confident in my ability to hit the ground running with zero ramp-up time.`;
    
    body1 = `Throughout my career, I have focused on building resilient, performant frontend architectures that handle mission-critical traffic without degrading user experience. My recent work closely mirrors the responsibilities outlined in ${companyName}'s requisition—specifically orchestrating modular micro-frontends, enforcing strict TypeScript type safety, and optimizing Core Web Vitals for maximum responsiveness.`;

    body2 = `What excites me about joining ${companyName} is your commitment to engineering excellence within the ${industry} space. I take pride in delivering maintainable codebases, establishing rigorous testing standards, and partnering closely with product designers and backend teams to ship features on cadence.`;

    closing = `I welcome the opportunity to discuss how my technical foundation and problem-solving mindset can accelerate ${companyName}'s upcoming roadmap. Thank you for your time and consideration.`;
  } else if (tone === 'impact') {
    opening = `I am excited to submit my application for the ${jobTitle} role at ${companyName}. As a software engineer with ${yearsExp}+ years of shipping customer-facing products, I specialize in transforming complex business workflows into fast, intuitive, and high-converting web applications.`;

    body1 = `In my previous projects, I led frontend initiatives that directly improved platform reliability, reduced page load latency by over 40%, and scaled checkout funnels handling millions in daily transaction volume. My technical stack—centered on ${stack}—allows me to deliver rapid, bulletproof solutions that directly support ${companyName}'s commercial targets.`;

    body2 = `${companyName}'s leadership in the ${industry} ecosystem stands out in the Philippine tech ecosystem. I bring a strong ownership mentality: measuring success not just by lines of code merged, but by the tangible business value, uptime, and user satisfaction delivered to end users.`;

    closing = `I would love the opportunity to share how my engineering track record can support ${companyName}'s growth goals. Looking forward to speaking with your recruitment team.`;
  } else {
    // Mission & Culture
    opening = `I am writing to apply for the ${jobTitle} position at ${companyName}. I have long admired ${companyName}'s transformative role in reshaping ${industry} in the Philippines, and I would love to contribute my ${yearsExp}+ years of software engineering experience to your mission.`;

    body1 = `Great engineering is as much about human empathy and team collaboration as it is about clean code. My day-to-day focus spans ${stack}, with an emphasis on creating accessible, delightfully smooth digital experiences that solve genuine problems for everyday users.`;

    body2 = `Having worked extensively in cross-functional agile squads, I value candid feedback, mentorship, and a culture of continuous learning. ${companyName}'s collaborative engineering philosophy deeply resonates with how I build software and support my teammates.`;

    closing = `I would be thrilled to connect with your team to discuss how my values and engineering background align with ${companyName}'s future. Thank you for considering my application.`;
  }

  const fullLetter = `${candidateName}
${candidateEmail} • ${candidatePhone} • ${candidateLocation}
${todayStr}

To the Hiring Team at ${companyName},

${opening}

${body1}

${body2}

${closing}

Sincerely,
${candidateName}`;

  return {
    opening,
    body1,
    body2,
    closing,
    fullLetter,
    wordCount: fullLetter.split(/\s+/).filter(Boolean).length
  };
}
