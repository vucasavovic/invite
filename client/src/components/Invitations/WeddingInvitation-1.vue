<template>
    <div  class="invitation invitation-template-1">

        <div class="border-wrapper">

            <img class="ornament" src="/invitationElements/branch-1.svg" alt="">
        <p class="body-copy">{{ invitation.intro || "Two hearts, two souls, one love for all time"}} </p>

        <div class="wedding-couple">
            <p class="person"> {{invitation.brideName || "Ashley Bird"}} </p>
            <p class="and">&</p>
            <p class="person">{{ invitation.groomName || "John Horse" }}</p>
        </div>
        <p class="body-copy main">
             {{invitation.mainParagraph}} 
        </p>

        <div class="date-time">
            <p class="body-copy">Date {{ useHumanDate(invitation.date) || "Tesday, Jan 12, This Year"  }}</p>
            <p class="body-copy">At {{invitation.time || "12:00"}} </p>
        </div>


        <div class="place">
            <p class="body-copy">{{invitation.place  || "Beautiful Church" }} </p>
            <p class="body-copy">{{invitation.address || "Church address, Number"}}</p>
        </div>
        
        <p class="body-copy last-line">{{invitation.lastLine || "Drinks and dance to follow!"}}</p>

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