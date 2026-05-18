import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const swPath = "/sw.js";
  
  return new NextResponse(
    `
    // Service Worker for Liturgia Diária IA
    const CACHE_NAME = "liturgia-diaria-v1";
    
    self.addEventListener("install", (e) => {
      self.skipWaiting();
    });
    
    self.addEventListener("activate", (e) => {
      self.clients.claim();
    });
    
    self.addEventListener("fetch", (e) => {
      e.respondWith(
        caches.match(e.request).then((r) => r || fetch(e.request))
      );
    });
    `,
    {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-cache",
        "Service-Worker-Allowed": "/",
      },
    }
  );
}
