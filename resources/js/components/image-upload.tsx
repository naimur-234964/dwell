
import { useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/sortable-item';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PropertyImage } from '@/types';

interface ImageUploadProps {
    onImagesChange: (images: File[]) => void;
    existingImages?: PropertyImage[];
    onExistingImagesChange?: (images: PropertyImage[]) => void;
    onImageDelete?: (id: number) => void;
}

export default function ImageUpload({ onImagesChange, existingImages = [], onExistingImagesChange, onImageDelete }: ImageUploadProps) {
    const [newImages, setNewImages] = useState<File[]>([]);
    const [currentExistingImages, setCurrentExistingImages] = useState<PropertyImage[]>(existingImages);

    useEffect(() => {
        setCurrentExistingImages(existingImages);
    }, [existingImages]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const updatedNewImages = [...newImages, ...files];
            setNewImages(updatedNewImages);
            onImagesChange(updatedNewImages);
        }
    };

    const handleRemoveImage = (item: File | PropertyImage) => {
        if (item instanceof File) {
            const updatedNewImages = newImages.filter((f) => f !== item);
            setNewImages(updatedNewImages);
            onImagesChange(updatedNewImages);
        } else {
            if (onImageDelete) {
                onImageDelete(item.id);
            }
            const updatedExistingImages = currentExistingImages.filter((i) => i.id !== item.id);
            setCurrentExistingImages(updatedExistingImages);
            if (onExistingImagesChange) {
                onExistingImagesChange(updatedExistingImages);
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const allItems = [...currentExistingImages, ...newImages];
            const oldIndex = allItems.findIndex((item) => (item instanceof File ? item.name : item.id) === active.id);
            const newIndex = allItems.findIndex((item) => (item instanceof File ? item.name : item.id) === over.id);

            const newOrder = arrayMove(allItems, oldIndex, newIndex);

            const reorderedNewImages = newOrder.filter((i) => i instanceof File) as File[];
            const reorderedExistingImages = newOrder.filter((i) => !(i instanceof File)) as PropertyImage[];

            setNewImages(reorderedNewImages);
            onImagesChange(reorderedNewImages);

            setCurrentExistingImages(reorderedExistingImages);
            if (onExistingImagesChange) {
                onExistingImagesChange(reorderedExistingImages);
            }
        }
    };

    const getImagePreview = (item: File | PropertyImage) => {
        if (item instanceof File) {
            return URL.createObjectURL(item);
        }
        return `/storage/${item.image_path}`;
    };

    const allImagesToDisplay = [...currentExistingImages, ...newImages];

    return (
        <div>
            <Label htmlFor="images">Images</Label>
            <Input id="images" type="file" multiple onChange={handleFileChange} className="mb-4" />

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={allImagesToDisplay.map((item) => (item instanceof File ? item.name : item.id))}
                    strategy={rectSortingStrategy}
                >
                    <div className="flex flex-wrap gap-4">
                        {allImagesToDisplay.map((item) => (
                            <SortableItem key={item instanceof File ? item.name : item.id} id={item instanceof File ? item.name : item.id} className="w-full md:w-[200px]">
                                <div className="relative">
                                    <img
                                        src={getImagePreview(item)}
                                        alt={`Preview`}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(item)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </SortableItem>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
