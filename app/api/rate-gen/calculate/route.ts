import { NextRequest, NextResponse } from 'next/server';
import { calculateRate, type JobType, type Region } from '@/lib/rate-calculator';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      jobType: string;
      experienceYears: number;
      skills?: string[];
      availableHoursPerMonth?: number;
      region?: string;
    };

    if (!body.jobType || typeof body.experienceYears !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const result = calculateRate({
      jobType: body.jobType as JobType,
      experienceYears: body.experienceYears,
      skills: body.skills ?? [],
      availableHoursPerMonth: body.availableHoursPerMonth,
      region: (body.region as Region) ?? 'remote',
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
