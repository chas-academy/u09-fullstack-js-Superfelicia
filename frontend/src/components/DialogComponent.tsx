import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import * as React from 'react'

interface DialogChildProps {
    closeDialog: () => void
}

interface DialogComponentProps {
    title?: string
    description?: string
    triggerText: string | React.ReactNode
    children?: React.ReactElement<DialogChildProps>[] | React.ReactElement<DialogChildProps>
    onConfirm: () => void
    confirmText?: string
    cancelText?: string
    isDeleteConfirmation?: boolean
}

const DialogComponent: React.FC<DialogComponentProps> = ({
    title,
    description,
    triggerText,
    children,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDeleteConfirmation = false,
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleConfirm = () => {
        onConfirm()
        setIsDialogOpen(false)
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>{triggerText}</Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center">
                    <DialogTitle className='p-2'>{title}</DialogTitle>
                    <DialogDescription className='p-6'>{description}</DialogDescription>
                    {/*closeDialog skickas med till children*/}
                    {React.Children.map(children, (child) => 
                        React.isValidElement(child) ? React.cloneElement(child, { closeDialog: () => setIsDialogOpen(false) })
                        : child)}
                    <div>
                        {!isDeleteConfirmation && (
                            <div className='flex space-x-4 mt-2'>
                                <Button onClick={handleConfirm}>{confirmText}</Button>
                                <Button onClick={() => setIsDialogOpen(false)}>{cancelText}</Button>
                            </div>
                        )}
                        {isDeleteConfirmation && (
                            <div className='flex space-x-4 mt-2'>
                                <Button variant="destructive" onClick={handleConfirm}>
                                    {confirmText}
                                </Button>
                                <Button onClick={() => setIsDialogOpen(false)}>{cancelText}</Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogComponent
