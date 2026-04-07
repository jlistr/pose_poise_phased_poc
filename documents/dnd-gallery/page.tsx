"use client";

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ---------- DATA ----------

interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

const INITIAL_IMAGES: GalleryImage[] = [
  { id: 'img-1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', title: 'Editorial 01' },
  { id: 'img-2', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800', title: 'Runway 02' },
  { id: 'img-3', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800', title: 'Commercial 03' },
  { id: 'img-4', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800', title: 'Beauty 04' },
  { id: 'img-5', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800', title: 'Avant Garde 05' },
  { id: 'img-6', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800', title: 'Lifestyle 06' },
  { id: 'img-7', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800', title: 'Streetwear 07' },
  { id: 'img-8', url: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800', title: 'Cinematic 08' },
];

// ---------- SORTABLE CARD ----------

function SortableCard({ image, isDragging }: { image: GalleryImage; isDragging: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isSorting ? transition : undefined,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <img
        src={image.url}
        alt={image.title}
        draggable={false}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />
      {/* Title */}
      <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
        <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">{image.title}</h3>
      </div>
      {/* Hover ring */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-white/30 transition-all pointer-events-none" />
    </div>
  );
}

// ---------- DRAG OVERLAY (floating ghost) ----------

function DragOverlayCard({ image }: { image: GalleryImage }) {
  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 ring-2 ring-white/40" style={{ width: 260 }}>
      <img
        src={image.url}
        alt={image.title}
        draggable={false}
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />
      <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
        <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">{image.title}</h3>
      </div>
    </div>
  );
}

// ---------- MAIN PAGE ----------

export default function DnDGalleryPlayground() {
  const [items, setItems] = useState(INITIAL_IMAGES);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement before drag starts — prevents accidental drags
      },
    }),
    useSensor(KeyboardSensor)
  );

  const activeImage = activeId ? items.find(i => i.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems(prev => {
        const oldIndex = prev.findIndex(i => i.id === active.id);
        const newIndex = prev.findIndex(i => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 lg:p-24 selection:bg-white/20">
      <header className="max-w-7xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          Gallery Drag &amp; Drop
        </h1>
        <p className="text-neutral-400 max-w-2xl leading-relaxed text-sm">
          Built with <code className="bg-white/10 px-2 py-0.5 rounded text-white font-mono text-xs">@dnd-kit/sortable</code> for
          buttery-smooth 2D grid reordering. Click and drag any image to a new position — the other images will instantly shift to make room.
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(image => (
              <SortableCard key={image.id} image={image} isDragging={activeId === image.id} />
            ))}
          </div>
        </SortableContext>

        {/* Drag overlay — the floating "ghost" card that follows the cursor */}
        <DragOverlay adjustScale={false} dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
          {activeImage ? <DragOverlayCard image={activeImage} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
