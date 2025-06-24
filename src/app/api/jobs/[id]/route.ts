import {NextRequest, NextResponse} from 'next/server';
import {getDb} from '@/lib/getDb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const db = await getDb();
  const jobId = params.id;

  if (!jobId) {
    return NextResponse.json({error: 'Job ID is required'}, {status: 400});
  }

  const job = await db.collection('jobs').findOne({_id: new ObjectId(jobId)});
  
  if (!job) {
    return NextResponse.json({error: 'Job not found'}, {status: 404});
  }

  return NextResponse.json(job);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const db = await getDb();
  const jobId = params.id;

  if (!jobId) {
    return NextResponse.json({error: 'Job ID is required'}, {status: 400});
  }

  const data = await req.json();
  const result = await db.collection('jobs').updateOne(
    {_id: new ObjectId(jobId)},
    {$set: data}
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({error: 'Job not found'}, {status: 404});
  }

  return NextResponse.json({...data, _id: jobId}, {status: 200});
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {  
  const db = await getDb();
  const jobId = params.id;

  if (!jobId) {
    return NextResponse.json({error: 'Job ID is required'}, {status: 400});
  }

  const result = await db.collection('jobs').deleteOne({_id: new ObjectId(jobId)});

  if (result.deletedCount === 0) {
    return NextResponse.json({error: 'Job not found'}, {status: 404});
  }

  return NextResponse.json({message: 'Job deleted successfully'}, {status: 200});
}