<template>
  <v-card flat id="no-fee-summary" v-if="isSummaryMode">
    <div class="summary-header">
      <v-layout row class="mx-0">
        <v-flex xs9>
          <v-icon class="my-n1" color="app-dk-blue">mdi-handshake</v-icon>
          <label class="summary-title">No-Fee Changes</label>
        </v-flex>
      </v-layout>
    </div>

    <!-- Contact Information -->
    <template v-if="hasContactInfoChange" id="no-fee-contact">
      <div class="section-container">
        <v-layout row class="mx-0 mt-4">
          <v-flex xs3>
            <v-layout column>
              <label><strong>Registered Office<br>Contact Information</strong></label>
            </v-layout>
          </v-flex>

          <!-- Email -->
          <v-flex xs4>
            <span class="subtitle text-body-3 mr-2">Email Address</span>
            <div id="lbl-email" class="info-text">{{ getBusinessContact.email }}</div>
          </v-flex>

          <!-- Phone -->
          <v-flex xs4>
            <span class="subtitle text-body-3 mr-2">Phone Number</span>
            <div id="lbl-phone" class="info-text">{{ getBusinessContact.phone }}
              <span v-if="!!getBusinessContact.extension">ext {{ getBusinessContact.extension }}</span>
            </div>
          </v-flex>

        </v-layout>
      </div>
      <v-divider class="mx-4" />
    </template>

    <!-- Folio Number -->
    <template id="no-fee-folio">
      <div class="section-container">
        <v-layout row class="mx-0 mt-4">
          <v-flex xs3>
            <v-layout column>
              <label><strong>Folio Number</strong></label>
            </v-layout>
          </v-flex>

          <v-flex xs4>
            <span class="info-text mr-2">A1234567</span> <!-- Placeholder Value -->
          </v-flex>

        </v-layout>
      </div>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

// Shared Interfaces
import { ContactPointIF } from '@bcrs-shared-components/interfaces'

@Component({})
export default class NoFeeSummary extends Vue {
  @Getter getBusinessContact!: ContactPointIF
  @Getter hasContactInfoChange!: boolean
  @Getter isSummaryMode!: boolean
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.summary-header {
  display: flex;
  background-color: $BCgovBlue5O;
  padding: 1.25rem;
}

.summary-title {
  padding-left: 0.5rem;
}
</style>
