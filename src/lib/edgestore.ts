'use client';
 
import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';
 
export async function generateStaticParams(){

  const { EdgeStoreProvider, useEdgeStore } =
    createEdgeStoreProvider<EdgeStoreRouter>();
}
 
// export { EdgeStoreProvider, useEdgeStore };