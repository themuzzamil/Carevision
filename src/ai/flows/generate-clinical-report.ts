'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating clinical reports based on patient data, reports, and doctor's notes.
 *
 * - generateClinicalReport - A function that orchestrates the clinical report generation process.
 * - GenerateClinicalReportInput - The input type for the generateClinicalReport function.
 * - GenerateClinicalReportOutput - The return type for the generateClinicalReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const GenerateClinicalReportInputSchema = z.object({
  patientDetails: z.string().describe('Details about the patient.'),
  reportText: z.string().describe('The extracted text from the uploaded medical reports.'),
  doctorNotes: z.string().describe('The doctor\'s notes for the patient session.'),
});
export type GenerateClinicalReportInput = z.infer<typeof GenerateClinicalReportInputSchema>;

// Define the output schema
const GenerateClinicalReportOutputSchema = z.object({
  summary: z.string().describe('A short summary of the patient medical reports.'),
  key_findings: z.array(z.string()).describe('Key findings from the medical reports.'),
  likely_diagnoses: z.array(z.object({
    diagnosis: z.string().describe('A likely diagnosis.'),
    reason: z.string().describe('The reasoning behind the diagnosis.'),
  })).describe('Top 3 likely diagnoses ranked with reasoning.'),
  recommended_tests: z.array(z.string()).describe('A priority list of recommended tests.'),
  next_steps: z.array(z.string()).describe('Immediate next steps.'),
  red_flags: z.array(z.string()).describe('Any red flags identified.'),
});
export type GenerateClinicalReportOutput = z.infer<typeof GenerateClinicalReportOutputSchema>;


// Define the main function that will be called
export async function generateClinicalReport(input: GenerateClinicalReportInput): Promise<GenerateClinicalReportOutput> {
  return generateClinicalReportFlow(input);
}

// Define the prompt
const clinicalReportPrompt = ai.definePrompt({
  name: 'clinicalReportPrompt',
  input: {schema: GenerateClinicalReportInputSchema},
  output: {schema: GenerateClinicalReportOutputSchema},
  prompt: `You are a medical assistant AI that summarizes patient medical reports.
Input: Patient details: {{{patientDetails}}}, uploaded report text: {{{reportText}}}, and doctor notes: {{{doctorNotes}}}.
Task:

Short summary (2-3 sentences)

Key findings (up to 6, bulleted)

Top 3 likely diagnoses (ranked, with 1-sentence reasoning each)

Recommended tests (priority list)

Immediate next steps and red flags
Output strictly in JSON:
{
"summary": "...",
"key_findings": ["..."],
"likely_diagnoses": [{"diagnosis":"...","reason":"..."}],
"recommended_tests": ["..."],
  "next_steps": ["..."],
  "red_flags": ["..."]
}
`,
});

// Define the flow
const generateClinicalReportFlow = ai.defineFlow(
  {
    name: 'generateClinicalReportFlow',
    inputSchema: GenerateClinicalReportInputSchema,
    outputSchema: GenerateClinicalReportOutputSchema,
  },
  async input => {
    const {output} = await clinicalReportPrompt(input);
    return output!;
  }
);
