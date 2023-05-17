<template>
    <div  class="invitation  invitation-template-2">

        <div class="border-wrapper">

            <img class="ornament" src="public/invitationElements/branch-2.svg" alt="">
        <p class="body-copy">{{ invitation.intro }}</p>

        <div class="wedding-couple">
            <p class="person">{{ invitation.brideName || 'Jenny Doe' }}</p>
            <p class="and">&</p>
            <p class="person">{{ invitation.groomName || 'John Deer' }}</p>
        </div>
        <p class="body-copy main">
            {{ invitation.mainParagraph }}
        </p>

        <div class="date-time">
            <p class="body-copy">Date {{ useHumanDate(invitation.date) }}</p>
            <p class="body-copy">At {{ invitation.time }}</p>
        </div>


        <div class="place">
            <p class="body-copy">{{ invitation.place }}</p>
            <p class="body-copy">{{ invitation.address }}</p>
        </div>

        <p class="body-copy last-line">{{ invitation.lastLine }}</p>

        </div>
    </div>
</template>

<script setup>
import { useHumanDate } from '../../composables/date';
 const props = defineProps({ 
    invitation:Object
})
</script>

<style lang="scss" scoped>
 
</style>