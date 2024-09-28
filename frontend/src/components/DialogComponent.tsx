import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'

interface DialogComponentProps {
    title?: string
    description?: string
    triggerText: string
    children?: React.ReactNode
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
                    <button onClick={() => setIsDialogOpen(true)}>{triggerText}</button>
                </DialogTrigger>
                <DialogContent className='bg-zinc-800'>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <>{isDeleteConfirmation ? null : children}</>
                    <div>
                        <button onClick={handleConfirm}>{confirmText}</button>
                        <button onClick={() => setIsDialogOpen(false)}>{cancelText}</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogComponent
