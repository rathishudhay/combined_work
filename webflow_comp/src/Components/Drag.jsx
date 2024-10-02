import React, { useState, useRef } from 'react';
import './drag.css'

const AccordionItem = ({ label, children, itemKey, onDragStart, onDrop, onChildDrop, color, isDragging, onDragEnter, onDragOver, onDragLeave, draggedItem, dragOverRef }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    // console.log(draggedItem, itemKey)
    const timeoutRef = useRef()
    return (
        <div
            className={`border mb-2 w-80 overflow-hidden main-cont ${draggedItem === itemKey ? 'hidden' : ''}`}
            style={{ backgroundColor: color }}
            onDragOver={(e) => {

                e.preventDefault();
                e.stopPropagation()
                if (dragOverRef.current !== itemKey) {
                    timeoutRef.current = {
                        key: itemKey, timeout: setTimeout(() => {
                            if (dragOverRef.current === itemKey) {
                                setIsOpen(true)
                            }

                        }, 1000)
                    }
                    dragOverRef.current = itemKey
                    console.log('dragged over', itemKey)
                }

                // setIsOpen(true);

            }}
            onDrop={(e) => {
                e.stopPropagation();
                onChildDrop(itemKey);
            }}
            onDragEnter={() => onDragEnter(itemKey)}
            onDragLeave={() => {
                if (timeoutRef.current?.key === itemKey) {
                    clearTimeout(timeoutRef.current.timeout)
                    timeoutRef.current = {}
                }
                onDragLeave(itemKey)
            }}
        >
            <div
                className="p-2 cursor-pointer draggable"
                onClick={toggleOpen}
                draggable
                onDragStart={() => {
                    onDragStart(itemKey)
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.stopPropagation();
                    const { clientX, target } = e;
                    const { left, width } = target.getBoundingClientRect();
                    const horizontalThreshold = left + width / 10;

                    const direction = clientX > horizontalThreshold ? 'right' : 'down';

                    onDrop(itemKey, direction);
                }}
            >
                {label}
            </div>
            {isOpen && (
                <div className="pl-4 overflow-hidden">
                    {children}
                </div>
            )}
        </div>
    );
};

const configStructure = {
    label: 'root',
    childOrder: ['key1', 'key2'],
    childMap: {
        key1: {
            label: 'value1',
            childOrder: ['key3', 'key4'],
            childMap: {
                key3: {
                    label: 'value3',
                },
                key4: {
                    label: 'value4',
                },
            },
        },
        key2: {
            label: 'value2',
            childOrder: ['key5', 'key6'],
            childMap: {
                key5: {
                    label: 'value5',
                    childOrder: ['key7', 'key8'],
                    childMap: {
                        key7: {
                            label: 'value7',
                        },
                        key8: {
                            label: 'value8',
                        },
                    }
                },
                key6: {
                    label: 'value6',
                },
            },
        },
    },
};


const findParent = (key, config) => {
    if (key === configStructure.label) return null;
    for (let childKey in config.childMap) {
        if (childKey === key) return config;
        if (config.childMap[childKey].childMap) {
            const found = findParent(key, config.childMap[childKey]);
            if (found) return found;
        }
    }
    return null;
};

const renderAccordion = ({ config, key, onDragStart, onDrop, onChildDrop, colorMap, dragState, onDragEnter, onDragOver, onDragLeave, draggedItem, dragOverRef }) => {
    // console.log({ config, key, onDragStart, onDrop, onChildDrop, colorMap, dragState, onDragEnter, onDragLeave, draggedItem })
    const { label, childOrder, childMap } = config;

    return (
        <AccordionItem
            key={key}
            label={label}
            itemKey={key}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onChildDrop={onChildDrop}
            color={colorMap[key]}
            isDragging={dragState.dragOverItem === key}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            draggedItem={draggedItem}
            onDragOver={onDragOver}
            dragOverRef={dragOverRef}
        >
            {childOrder && childOrder.map((childKey) => (
                childMap[childKey] && renderAccordion({ onDragOver: onDragOver, config: childMap[childKey], key: childKey, onDragStart, onDrop, onChildDrop, colorMap, dragState, onDragEnter, onDragLeave, draggedItem, dragOverRef })
            ))}
        </AccordionItem>
    );
};

const App = () => {

    const dragOverRef = useRef()

    const [config, setConfig] = useState(configStructure);
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragOverItem, setDragOverItem] = useState(null);

    const handleDragStart = (key) => {
        setDraggedItem(key);
    };

    const handleDrop = (targetKey, direction) => {
        if (draggedItem && draggedItem !== targetKey) {
            setConfig((prevConfig) => {
                const newConfig = { ...prevConfig };

                const draggedItemParent = findParent(draggedItem, newConfig);
                const draggedItemData = draggedItemParent ? draggedItemParent.childMap[draggedItem] : null;

                if (!draggedItemData) return newConfig;

                if (draggedItemParent) {
                    draggedItemParent.childOrder = draggedItemParent.childOrder.filter(key => key !== draggedItem);
                    delete draggedItemParent.childMap[draggedItem];
                }

                let targetItem;
                if (direction === 'down') {
                    const parent = findParent(targetKey, newConfig);
                    if (parent) {
                        const index = parent.childOrder.indexOf(targetKey);
                        parent.childOrder.splice(index + 1, 0, draggedItem);
                        parent.childMap[draggedItem] = draggedItemData;
                    }
                } else {
                    targetItem = targetKey === configStructure.label ? newConfig : findParent(targetKey, newConfig).childMap[targetKey];
                    if (!targetItem.childOrder) targetItem.childOrder = [];
                    if (!targetItem.childMap) targetItem.childMap = {};
                    targetItem.childOrder.push(draggedItem);
                    targetItem.childMap[draggedItem] = draggedItemData;
                }

                return newConfig;
            });
            setDraggedItem(null);
        }
    };

    const handleChildDrop = (parentKey) => {
        if (draggedItem && draggedItem !== parentKey) {
            setConfig((prevConfig) => {
                const newConfig = { ...prevConfig };

                const draggedItemParent = findParent(draggedItem, newConfig);
                const draggedItemData = draggedItemParent ? draggedItemParent.childMap[draggedItem] : null;

                if (!draggedItemData) return newConfig;

                if (draggedItemParent) {
                    draggedItemParent.childOrder = draggedItemParent.childOrder.filter(key => key !== draggedItem);
                    delete draggedItemParent.childMap[draggedItem];
                }

                const targetItem = parentKey === configStructure.label ? newConfig : findParent(parentKey, newConfig).childMap[parentKey];
                if (!targetItem.childOrder) targetItem.childOrder = [];
                if (!targetItem.childMap) targetItem.childMap = {};
                targetItem.childOrder.push(draggedItem);
                targetItem.childMap[draggedItem] = draggedItemData;

                return newConfig;
            });
            setDraggedItem(null);
        }
    };

    const handleDragEnter = (key) => {

    };
    const handleDragOver = (key) => {
        console.log('handle dragn over', key)
        setDragOverItem(key);
    }

    const handleDragLeave = () => {
        setDragOverItem(null);
    };

    const colorMap = {
        root: 'blue',
        key1: 'green',
        key2: 'red',
        key3: 'orange',
        key4: 'purple',
        key5: 'pink',
        key6: 'cyan',
        key7: 'yellow',
        key8: 'teal',
    };

    return (
        <div className="p-4">
            {renderAccordion({ config, key: 'root', onDragStart: handleDragStart, onDrop: handleDrop, onChildDrop: handleChildDrop, colorMap, dragState: { dragOverItem }, onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, draggedItem, onDragOver: { handleDragOver }, dragOverRef })}
        </div>
    );
};

export default App;



// Positioning elements before or after

