export const questionAnswerPrompt = (
  role: string,
  experience: string,
  topicsToFocus: string,
  numberOfQuestions: string
) => `
You are an API that generates structured interview questions and answers.

CONTEXT:
- Role: ${role}
- Candidate experience: ${experience} years
- Focus topics: ${topicsToFocus || 'general topics relevant to the role'}
- Number of questions: ${numberOfQuestions}

OUTPUT FORMAT:
Return ${numberOfQuestions} question-answer pairs. Each pair must be wrapped in delimiters.

DELIMITERS (REQUIRED):
<QA_START>
{valid JSON object here}
<QA_END>

JSON STRUCTURE (STRICT):
{
  "question": "string - the interview question",
  "answer": {
    "blocks": [
      {
        "type": "text",
        "content": "string - opening explanation"
      },
      {
        "type": "code",
        "language": "string - programming language",
        "content": "string - code example"
      },
      {
        "type": "text",
        "content": "string - closing insights, best practices, or key takeaways"
      }
    ]
  }
}

BLOCK RULES:
- answer.blocks MUST be an array with 2+ blocks
- Each block MUST have type "text" OR "code" (never both)
- text block: { "type": "text", "content": "explanation" }
- code block: { "type": "code", "language": "javascript", "content": "code" }

ANSWER STRUCTURE (RECOMMENDED):
1. Opening text: Explain the concept, approach, or direct answer
2. Code block(s): Demonstrate with practical, runnable examples (when relevant)
3. Closing text: Provide best practices, common pitfalls, when to use, or key takeaways

- You may use multiple blocks in any logical order
- Some questions may not need code (e.g., behavioral, conceptual)
- Closing text should add value: best practices, gotchas, real-world context, or trade-offs

JSON FORMATTING:
- Escape double quotes with \"
- Use \n for newlines in code
- No markdown, no backticks
- Ensure valid JSON syntax

CONTENT GUIDELINES:
- Generate realistic interview questions for ${experience} years of experience
- Focus on: ${topicsToFocus || 'core concepts, problem-solving, and practical skills'}
- Answers should be interview-appropriate: clear, accurate, concise
- Code must be syntactically correct and use appropriate language for the role
- Closing text should provide actionable insights or important context

OUTPUT REQUIREMENTS:
- Output ONLY <QA_START>...<QA_END> blocks
- No text before, between, or after blocks
- Complete each question fully before starting the next

EXAMPLE:

<QA_START>
{
  "question": "Explain the difference between let and const in JavaScript.",
  "answer": {
    "blocks": [
      {
        "type": "text",
        "content": "let allows reassignment of the variable, while const creates a constant reference that cannot be reassigned. However, const objects and arrays can still have their properties modified."
      },
      {
        "type": "code",
        "language": "javascript",
        "content": "let count = 1;\ncount = 2; // OK\n\nconst MAX = 100;\nMAX = 200; // Error\n\nconst user = { name: 'John' };\nuser.name = 'Jane'; // OK - properties can change\nuser = {}; // Error"
      },
      {
        "type": "text",
        "content": "Best practice: Use const by default for values that won't be reassigned. This makes your code more predictable and helps prevent accidental reassignments. Only use let when you know the variable will need to be reassigned."
      }
    ]
  }
}
<QA_END>
`

export const conceptExplainPrompt = (question: string) => `
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a valid JSON object in the following format:

{
  "title": "Short title here",
  "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`

export const explainAnswerPrompt = (
  question: string,
  answer: string,
  role?: string,
  experience?: number
) => `
You are an API that provides deeper explanations for an existing interview answer.

CONTEXT:
- Interview question:
"${question}"

- Existing answer:
"${answer}"
${role ? `- Role: ${role}` : ''}
${experience !== undefined ? `- Candidate experience: ${experience} years` : ''}

TASK:
Explain the answer more deeply.
Do NOT repeat the question or restate the answer.
Focus on reasoning, clarification, and underlying concepts.

OUTPUT FORMAT:
Return ONE explanation wrapped in delimiters.

DELIMITERS (REQUIRED):
<EXPLANATION_START>
{valid JSON object here}
<EXPLANATION_END>

JSON STRUCTURE (STRICT):
{
  "blocks": [
    {
      "type": "text",
      "content": "string - deeper explanation or clarification"
    },
    {
      "type": "code",
      "language": "javascript",
      "content": "string - optional example if it helps understanding"
    },
    {
      "type": "text",
      "content": "string - common mistakes, edge cases, or best practices"
    }
  ]
}

RULES:
- At least 1 text block is required
- Code block is optional
- Do NOT introduce new topics
- Do NOT restate existing answer
- Add only new insight

JSON FORMATTING:
- Escape double quotes with \"
- Use \\n for newlines
- No markdown, no backticks
- Ensure valid JSON

OUTPUT REQUIREMENTS:
- Output ONLY <EXPLANATION_START>...<EXPLANATION_END>
- No text before or after
`

export const generateAnswerFollowUpPrompt = (
  originalQuestion: string,
  originalAnswer: string,
  userQuestion: string,
  role?: string,
  experience?: number
) => `
You are an API that answers a user's follow-up question based on an existing interview question and answer.

CONTEXT:
- Original interview question:
"${originalQuestion}"

- Original answer:
"${originalAnswer}"

- User follow-up question:
"${userQuestion}"
${role ? `- Role: ${role}` : ''}
${experience !== undefined ? `- Candidate experience: ${experience} years` : ''}

TASK:
Answer the user's follow-up question clearly and directly.
Focus ONLY on what the user is asking.
Do NOT restate the original question or original answer unless necessary for clarity.
Do NOT introduce unrelated topics.

OUTPUT FORMAT:
Return ONE answer wrapped in delimiters.

DELIMITERS (REQUIRED):
<FOLLOW_UP_START>
{valid JSON object here}
<FOLLOW_UP_END>

JSON STRUCTURE (STRICT):
{
  "blocks": [
    {
      "type": "text",
      "content": "string - direct answer to the user's follow-up question"
    },
    {
      "type": "code",
      "language": "javascript",
      "content": "string - optional example if it helps answer the question"
    },
    {
      "type": "text",
      "content": "string - practical insight, edge cases, or best practices related to the question"
    }
  ]
}

RULES:
- At least 1 text block is required
- Code block is optional
- Answer ONLY what the user asked
- Do NOT repeat existing explanations
- Keep the answer concise and interview-focused

JSON FORMATTING:
- Escape double quotes with \"
- Use \\n for newlines
- No markdown, no backticks
- Ensure valid JSON

OUTPUT REQUIREMENTS:
- Output ONLY <FOLLOW_UP_START>...<FOLLOW_UP_END>
- No text before or after
`
