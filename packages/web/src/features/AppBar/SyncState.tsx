import { IconButton, Typography } from '@material-ui/core'
import { Sync } from '@material-ui/icons'
import { useAtomValue } from 'jotai/utils'
import React, { useEffect, useState } from 'react'
import { lastSyncTimeState, useForceSync } from '../../state'
import { formatDateRelativeToNow } from '../../utils'

export default function SyncState() {
    const forceSync = useForceSync()
    const lastSyncTime = useAtomValue(lastSyncTimeState)
    const [formattedTime, setFormattedTime] = useState(lastSyncTime ? formatDateRelativeToNow(lastSyncTime) : 'Never')

    useEffect(() => {
        const interval = setInterval(() => {
            if (lastSyncTime) {
                setFormattedTime(formatDateRelativeToNow(lastSyncTime))
            }
        }, 1000);

        return () => {
          clearInterval(interval);
        };
      }, [lastSyncTime]);

    return (
        <>
            <Typography>Last time synced: {formattedTime}</Typography>
            <IconButton onClick={forceSync}>
                <Sync />
            </IconButton>
        </>
    )
}