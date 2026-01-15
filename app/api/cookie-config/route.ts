import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const CONFIG_FILE = join(process.cwd(), 'config', 'cookie-config.json');

// Default values if config doesn't exist
const DEFAULT_SESSION = '4rrbqqpthi07h0fpqllhqi3oirpgo2pd';
const DEFAULT_COOKIE = 'e0e161dc671a2d979810244af04d6ddf';

interface CookieConfig {
  session: string;
  cookie: string;
}

function getConfig(): CookieConfig {
  try {
    const config = readFileSync(CONFIG_FILE, 'utf-8');
    const parsed = JSON.parse(config);
    return {
      session: parsed.session || DEFAULT_SESSION,
      cookie: parsed.cookie || DEFAULT_COOKIE,
    };
  } catch (error) {
    // If file doesn't exist, return defaults
    return {
      session: DEFAULT_SESSION,
      cookie: DEFAULT_COOKIE,
    };
  }
}

function combineCookieString(session: string, cookie: string): string {
  return `ci_session=${session}; _cookie=${cookie}`;
}

function saveConfig(session: string, cookie: string): void {
  try {
    const configDir = join(process.cwd(), 'config');
    
    // Create config directory if it doesn't exist
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }
    
    const config: CookieConfig = { session, cookie };
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`Failed to save config: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// GET - Retrieve current session and cookie
export async function GET() {
  try {
    const config = getConfig();
    return NextResponse.json({ 
      session: config.session,
      cookie: config.cookie,
      combined: combineCookieString(config.session, config.cookie)
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Update session and cookie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session, cookie } = body;

    if (!session || typeof session !== 'string') {
      return NextResponse.json(
        { error: 'Session is required and must be a string' },
        { status: 400 }
      );
    }

    if (!cookie || typeof cookie !== 'string') {
      return NextResponse.json(
        { error: 'Cookie is required and must be a string' },
        { status: 400 }
      );
    }

    saveConfig(session, cookie);
    return NextResponse.json({ 
      success: true, 
      message: 'Session and cookie updated successfully',
      session,
      cookie,
      combined: combineCookieString(session, cookie)
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
