import { PayloadAction } from '@reduxjs/toolkit'
import { click, increment } from '../ui/uiReducer'
import {
    envApi,
    oscApi,
    filtersApi,
    srcMixApi,
    fxApi,
    ringModApi,
    noiseApi,
    masterClockApi,
    arpApi,
    kbdApi,
    postMixApi,
    commonFxApi,
    outApi,
    lfoApi,
    voicesApi,
    mainDisplayApi,
} from '../../synthcoreApi'
import { ControllerGroupIds } from '../../types'

import modsApi from '../mods/modsApi'

