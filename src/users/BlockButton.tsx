// src/users/BlockButton.tsx
import {
    useRecordContext,
    useNotify,
    useRefresh,
    useUpdate,
    Button,
} from 'react-admin';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const BlockButton = () => {
    const record  = useRecordContext();
    const notify  = useNotify();
    const refresh = useRefresh();
    const [update, { isLoading }] = useUpdate();

    if (!record) return null;

    const toggle = () => {
        const action = record.isEnabled ? 'bloquer' : 'débloquer';
        if (!window.confirm(`Voulez-vous vraiment ${action} cet utilisateur ?`))
            return;

        update(
            'users',
            {
                id  : record.id,
                data: { isEnabled: !record.isEnabled },
                previousData: record,
            },
            {
                onSuccess: () => {
                    notify(
                      `Utilisateur ${action === 'bloquer' ? 'bloqué' : 'débloqué'} !`,
                      { type: 'info' }
                    );
                    refresh();
                },
                onError: () =>
                    notify('Erreur côté serveur', { type: 'warning' }),
            }
        );
    };

    /* stopPropagation = empêche rowClick="edit" */
    return (
        <Button
            label={record.isEnabled ? 'Bloquer' : 'Débloquer'}
            disabled={isLoading}
            onClick={(e) => {
                e.stopPropagation();   // ← la ligne n’entend pas le clic
                toggle();
            }}
        >
            {record.isEnabled ? <LockIcon /> : <LockOpenIcon />}
        </Button>
    );
};
